using InterviewTest.Server.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;

namespace InterviewTest.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListController : ControllerBase
    {
        //NOTES:
        //1. In a REAL world project, should use dependency injection to inject Database connection object into this class and
        //instantiate it in the constructor. This will promote loose coupling and dependency inversion principle and avoid
        //the database connection being created in each method.
        //2. There should NOT be database add/modify/delete code in controllers, it should be in the Data layer
        //3. Can consider using Entity Framework in the .NET project to handle the communication with database
        //4. This controller name should be changed to something more accurate in a real world project - eg. EmployeesController
        //5. Error handling and validation has not been added in this project which it would be in LIVE project
        public ListController()
        {
        }

        //Get list of employees
        [HttpGet]
        public List<Employee> Get()
        {
            var employees = new List<Employee>();

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"SELECT Name, Value FROM Employees ORDER BY Name";
                using (var reader = queryCmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        employees.Add(new Employee
                        {
                            Name = reader.GetString(0),
                            Value = reader.GetInt32(1)
                        });
                    }
                }
            }
            return employees;
        }     

        //get list employee based on employee name (ideally this would be an ID field not name)
        [HttpGet("{employeeName}")]
        public Employee Get(string employeeName)
        {
            var employee = new Employee();

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"SELECT Name, Value FROM Employees WHERE Name='" + employeeName + "'";
                using (var reader = queryCmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        employee.Name = reader.GetString(0);
                        employee.Value = reader.GetInt32(1);
                    }
                }
            }
            return employee;
        }

        //Modify employee values based on requirement to add numbers to existing employee values
        [HttpGet]
        [Route("ModifyEmployeeValues")]
        public List<Employee> ModifyEmployeeValues()
        {
            var employees = new List<Employee>();

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();
                //Increment values where name begins with 'E'
                var queryCmd1 = connection.CreateCommand();
                queryCmd1.CommandText = "UPDATE Employees SET Value = Value + '" + 1 + "' WHERE Name LIKE 'E%'";
                queryCmd1.ExecuteNonQuery();

                //Increment values where name begins with 'G'
                var queryCmd2 = connection.CreateCommand();
                queryCmd2.CommandText = "UPDATE Employees SET Value = Value + '" + 10 + "' WHERE Name LIKE 'G%'";
                queryCmd2.ExecuteNonQuery();

                //Increment values where name does not begin with 'E' or 'G'
                var queryCmd3 = connection.CreateCommand();
                queryCmd3.CommandText = "UPDATE Employees SET Value = Value + '" + 100 + "' WHERE (Name NOT LIKE 'E%' AND Name NOT LIKE 'G%')";
                queryCmd3.ExecuteNonQuery();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"SELECT Name, Value FROM Employees ORDER BY Name";
                using (var reader = queryCmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        employees.Add(new Employee
                        {
                            Name = reader.GetString(0),
                            Value = reader.GetInt32(1)
                        });
                    }
                }
            }
            return employees;
        }

        //retrieve the sum of all values for all employees where employee name begins with A, B or C
        [HttpGet]
        [Route("SumOfValues")]
        public int SumOfValues()
        {
            int sumOfValues = 0;
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"SELECT SUM(Value) FROM Employees WHERE " +
                    "((Name LIKE 'A%') OR (Name LIKE 'B%') OR (Name LIKE 'C%'))";
                sumOfValues = Convert.ToInt32(queryCmd.ExecuteScalar());

                connection.Close();
                connection.Dispose();
            }
            return sumOfValues;
        }

        //add a new employee
        [HttpPost]
        public void Post(string name, string value)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"INSERT INTO Employees VALUES ('" + name + "','" + Convert.ToInt32(value) + "')";
                queryCmd.ExecuteNonQuery();
            }
        }

        //update an existing employee
        [HttpPut]
        public void Put(string name, string value)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"UPDATE Employees SET Value = '" + Convert.ToInt32(value) + "'" +
                    " WHERE Name = '" + name + "'";
                queryCmd.ExecuteNonQuery();
            }
        }

        //delete an employee from DB
        [HttpDelete]
        public void Delete(string name)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"DELETE FROM Employees WHERE Name = '" + name + "'";
                queryCmd.ExecuteNonQuery();
            }
        }

    }
}
