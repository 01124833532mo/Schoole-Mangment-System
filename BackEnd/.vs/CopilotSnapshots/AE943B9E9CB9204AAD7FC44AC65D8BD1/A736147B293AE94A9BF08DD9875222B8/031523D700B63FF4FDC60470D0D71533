using AutoMapper;
using AutoMapper.QueryableExtensions;
using Day1.DTOs;
using Day1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Day1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class DepartmentController : ControllerBase
    {
        private readonly ITIContext _db;
        private readonly IMapper _mapper;

        public DepartmentController(ITIContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        /// <summary>
        /// Gets all departments with number of students in each department.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(List<DepartmentDto>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<DepartmentDto>>> GetAll()
        {
            List<DepartmentDto> departments = await _db.Departments
                .AsNoTracking()
                .ProjectTo<DepartmentDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Ok(departments);
        }

        /// <summary>
        /// Gets a department by id.
        /// </summary>
        /// <param name="id">Department id.</param>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(DepartmentDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<DepartmentDto>> GetById(int id)
        {
            DepartmentDto? department = await _db.Departments
                .AsNoTracking()
                .Where(d => d.ID == id)
                .ProjectTo<DepartmentDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();

            if (department is null) return NotFound();
            return Ok(department);
        }

        /// <summary>
        /// Creates a new department.
        /// </summary>
        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(typeof(DepartmentDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<DepartmentDto>> Add(DepartmentUpsertDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            Department department = _mapper.Map<Department>(dto);
            department.ID = (await _db.Departments.MaxAsync(d => (int?)d.ID) ?? 0) + 1;

            _db.Departments.Add(department);
            await _db.SaveChangesAsync();

            DepartmentDto result = await _db.Departments
                .AsNoTracking()
                .Where(d => d.ID == department.ID)
                .ProjectTo<DepartmentDto>(_mapper.ConfigurationProvider)
                .FirstAsync();

            return CreatedAtAction(nameof(GetById), new { id = department.ID }, result);
        }

        /// <summary>
        /// Updates an existing department.
        /// </summary>
        /// <param name="id">Department id.</param>
        [HttpPut("{id:int}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(int id, DepartmentUpsertDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            Department? existing = await _db.Departments.FirstOrDefaultAsync(d => d.ID == id);
            if (existing is null) return NotFound();

            _mapper.Map(dto, existing);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        /// <summary>
        /// Deletes a department by id.
        /// </summary>
        /// <param name="id">Department id.</param>
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int id)
        {
            Department? department = await _db.Departments.FirstOrDefaultAsync(d => d.ID == id);
            if (department is null) return NotFound();

            _db.Departments.Remove(department);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
