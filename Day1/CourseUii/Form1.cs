using System.Net.Http.Json;

namespace CourseUii
{
    public partial class Form1 : Form
    {
        private readonly HttpClient _httpClient;
        private const string ApiBaseUrl = "https://localhost:7073/api";

        public Form1()
        {
            InitializeComponent();

            var handler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            _httpClient = new HttpClient(handler);
            _httpClient.Timeout = TimeSpan.FromSeconds(30);

            // Hook up add button properly
            Add.Click += btnCreate_Click;
        }

        private async void Form1_Load(object sender, EventArgs e)
        {
            await LoadCourses();
        }

        private async Task LoadCourses()
        {
            try
            {
                UpdateStatus("Loading courses...");

                var response = await _httpClient.GetAsync($"{ApiBaseUrl}/course");

                if (response.IsSuccessStatusCode)
                {
                    var courses = await response.Content.ReadFromJsonAsync<List<CourseDto>>();

                    CoursesView.DataSource = courses;
                    UpdateStatus($"Loaded {courses?.Count ?? 0}");
                }
                else
                {
                    MessageBox.Show($"Error loading courses: {response.StatusCode}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    UpdateStatus("Failed to load courses.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                UpdateStatus("Error loading courses.");
            }
        }

        private async void btnCreate_Click(object sender, EventArgs e)
        {
            if (!ValidateCreateForm())
                return;

            try
            {
                UpdateStatus("Creating course...");

                var newCourse = new CourseDto
                {
                    name = textBox1.Text.Trim(),
                    Duration = int.Parse(dur.Text),
                    CourseDesc = desc.Text.Trim()
                };

                var response = await _httpClient.PostAsJsonAsync($"{ApiBaseUrl}/course", newCourse);

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Course created successfully!", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    ClearCreateForm();
                    await LoadCourses();
                    UpdateStatus("Course created successfully.");
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    MessageBox.Show($"Error creating course: {response.StatusCode}\n{errorContent}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    UpdateStatus("Failed to create course.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                UpdateStatus("Error creating course.");
            }
        }

        private bool ValidateCreateForm()
        {
            if (string.IsNullOrWhiteSpace(textBox1.Text))
            {
                MessageBox.Show("Course name is required.", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            if (!int.TryParse(dur.Text, out int duration) || duration <= 0)
            {
                MessageBox.Show("Duration must be a positive number.", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            return true;
        }

        private void ClearCreateForm()
        {
            textBox1.Text = string.Empty;
            dur.Text = string.Empty;
            desc.Text = string.Empty;
            textBox1.Focus();
        }

        private void UpdateStatus(string message)
        {
            // If you add a status strip later, you can update it here.
            this.Text = message; // As a fallback since we don't have toolStripStatusLabel in designer anymore
        }
    }

    /// <summary>
    /// Data Transfer Object for Course API
    /// </summary>
    public class CourseDto
    {
        public int id { get; set; }
        public string name { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int? TopId { get; set; }
        public string? CourseDesc { get; set; }
    }
}
