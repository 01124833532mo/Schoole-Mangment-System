using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Day1.DTOs;
using Day1.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Day1.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<ApplicationUser> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        ApplicationUser? existingUser = await _userManager.FindByEmailAsync(dto.Email);
        if (existingUser is not null)
            return BadRequest("Email already exists.");

        var user = new ApplicationUser
        {
            Email = dto.Email,
            UserName = dto.UserName
        };

        IdentityResult result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
            return BadRequest(result.Errors.Select(e => e.Description));

        AuthResponseDto response = GenerateToken(user);
        return Ok(response);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        ApplicationUser? user = await _userManager.FindByEmailAsync(dto.Email);
        if (user is null) return Unauthorized("Invalid email or password.");

        bool isValidPassword = await _userManager.CheckPasswordAsync(user, dto.Password);
        if (!isValidPassword) return Unauthorized("Invalid email or password.");

        AuthResponseDto response = GenerateToken(user);
        return Ok(response);
    }

    private AuthResponseDto GenerateToken(ApplicationUser user)
    {
        string key = _configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is missing in configuration.");
        string issuer = _configuration["Jwt:Issuer"] ?? "Day1Api";
        string audience = _configuration["Jwt:Audience"] ?? "Day1Client";
        int expirationMinutes = int.TryParse(_configuration["Jwt:ExpirationInMinutes"], out int parsed) ? parsed : 60;

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id),
            new(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
            new(JwtRegisteredClaimNames.UniqueName, user.UserName ?? string.Empty),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var creds = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
        DateTime expiresAt = DateTime.UtcNow.AddMinutes(expirationMinutes);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: creds);

        return new AuthResponseDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresAt = expiresAt,
            Email = user.Email ?? string.Empty,
            UserName = user.UserName ?? string.Empty
        };
    }
}
