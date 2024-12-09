const data = {
  "2a": `package AdvJava.week2;

import java.sql.*;

public class P1StudentDB {

    // Database URL, username, and password
    private static final String DB_URL = "jdbc:mysql://localhost:3306/dbName", USER = "root", PASS = ""; // Update this

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;

        try {
            // Establish the connection
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();

            // Create the students table if it does not exist
            String createTableSQL = "CREATE TABLE IF NOT EXISTS students (" +
                    "USN VARCHAR(20) PRIMARY KEY, " +
                    "Name VARCHAR(100), " +
                    "Semester INT, " +
                    "CGPA FLOAT)";
            stmt.executeUpdate(createTableSQL);
            System.out.println("Table 'students' created or already exists.");

            // Insert sample data
            String insertDataSQL = "INSERT INTO students (USN, Name, Semester, CGPA) VALUES " +
                    "('1MS22CS301', 'Anika Sharma', 5, 8.5), " +
                    "('1MS22CS302', 'Rahul Patel', 5, 7.5), " +
                    "('1MS23CS303', 'Priya Gupta', 3, 9.0), " +
                    "('1MS22CS304', 'Vivek Kumar', 5, 8.0), " +
                    "('1MS22CS305', 'Neha Singh', 3, 8.3), " +
                    "('1MS22CS306', 'Amit Mishra', 5, 9.2), " +
                    "('1MS21CS307', 'Meera Nair', 7, 7.9), " +
                    "('1MS22CS308', 'Rohan Raj', 5, 8.1)";
            stmt.executeUpdate(insertDataSQL);
            System.out.println("Sample data inserted into 'students' table.");

            // i. Display details of all the students
            String queryAllStudents = "SELECT * FROM students";
            ResultSet rsAll = stmt.executeQuery(queryAllStudents);
            System.out.println("\nAll Students:");
            System.out.println("USN\t\tName\t\tSemester\tCGPA");
            while (rsAll.next()) {
                System.out.println(rsAll.getString("USN") + "\t" +
                        rsAll.getString("Name") + "\t" +
                        rsAll.getInt("Semester") + "\t\t" +
                        rsAll.getFloat("CGPA"));
            }

            // ii. Display details of all the students who are in the 5th Semester
            String queryFifthSemester = "SELECT * FROM students WHERE Semester = 5";
            ResultSet rsFifth = stmt.executeQuery(queryFifthSemester);
            System.out.println("\nStudents in 5th Semester:");
            System.out.println("USN\t\tName\t\tCGPA");
            while (rsFifth.next()) {
                System.out.println(rsFifth.getString("USN") + "\t" +
                        rsFifth.getString("Name") + "\t" +
                        rsFifth.getFloat("CGPA"));
            }

            // iii. Display details of all students who have CGPA above 8.0 and are in 5th Semester
            String queryHighCGPA = "SELECT * FROM students WHERE CGPA > 8.0 AND Semester = 5";
            ResultSet rsHighCGPA = stmt.executeQuery(queryHighCGPA);
            System.out.println("\nStudents with CGPA > 8.0 in 5th Semester:");
            System.out.println("USN\t\tName\t\tCGPA");
            while (rsHighCGPA.next()) {
                System.out.println(rsHighCGPA.getString("USN") + "\t" +
                        rsHighCGPA.getString("Name") + "\t" +
                        rsHighCGPA.getFloat("CGPA"));
            }

            // iv. Display the total number of students who have CGPA above 8.0
            String queryTotalHighCGPA = "SELECT COUNT(*) AS total FROM students WHERE CGPA > 8.0";
            ResultSet rsTotal = stmt.executeQuery(queryTotalHighCGPA);
            if (rsTotal.next()) {
                System.out.println("\nTotal number of students with CGPA > 8.0: " + rsTotal.getInt("total"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close resources
            try {
                if (stmt != null)
                    stmt.close();
                if (conn != null)
                    conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}`,
  "2b": `package AdvJava.week2;

import java.sql.*;

public class P2EmployeeDB {

    // Database URL, username, and password
    private static final String DB_URL = "jdbc:mysql://localhost:3306/dbName", USER = "root", PASS = ""; // Update this

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;

        try {
            // Establish the connection
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();

            // Create the employees table if it does not exist
            String createTableSQL = "CREATE TABLE IF NOT EXISTS employees (" +
                    "ID INT PRIMARY KEY, " +
                    "FName VARCHAR(50), " +
                    "LName VARCHAR(50), " +
                    "Project VARCHAR(100), " +
                    "Salary DECIMAL(10, 2))";
            stmt.executeUpdate(createTableSQL);
            System.out.println("Table 'employees' created or already exists.");

            // Insert sample data
            String insertDataSQL = "INSERT INTO employees (ID, FName, LName, Project, Salary) VALUES " +
                    "(1, 'Anika', 'Sharma', 'Web Development', 80000), " +
                    "(2, 'Rahul', 'Patel', 'Devops Engineer', 60000), " +
                    "(3, 'Priya', 'Gupta', 'Web Development', 75000), " +
                    "(4, 'Vivek', 'Kumar', 'Web Development', 50000), " +
                    "(5, 'Neha', 'Singh', 'Software Engg', 45000), " +
                    "(6, 'Amit', 'Mishra', 'Web Development', 90000), " +
                    "(7, 'Meera', 'Nair', 'Data Analysis', 40000), " +
                    "(8, 'Rohan', 'Raj', 'Web Development', 70000)";
            stmt.executeUpdate(insertDataSQL);
            System.out.println("Sample data inserted into 'employees' table.");

            // i. Display details of all the employees
            String queryAllEmployees = "SELECT * FROM employees";
            ResultSet rsAll = stmt.executeQuery(queryAllEmployees);
            System.out.println("\nAll Employees:");
            System.out.println("ID\tFName\tLName\tProject\tSalary");
            while (rsAll.next()) {
                System.out.println(rsAll.getInt("ID") + "\t" +
                        rsAll.getString("FName") + "\t" +
                        rsAll.getString("LName") + "\t" +
                        rsAll.getString("Project") + "\t" +
                        rsAll.getBigDecimal("Salary"));
            }

            // ii. Display details of all the employees who work for project “Web Development”
            String queryWebDevelopment = "SELECT * FROM employees WHERE Project = 'Web Development'";
            ResultSet rsWebDev = stmt.executeQuery(queryWebDevelopment);
            System.out.println("\nEmployees in 'Web Development':");
            System.out.println("ID\tFName\tLName\tSalary");
            while (rsWebDev.next()) {
                System.out.println(rsWebDev.getInt("ID") + "\t" +
                        rsWebDev.getString("FName") + "\t" +
                        rsWebDev.getString("LName") + "\t" +
                        rsWebDev.getBigDecimal("Salary"));
            }

            // iii. Display the IDs of all those employees who have salary above 75,000 and are in “Web Development”
            String queryHighSalaryWebDev = "SELECT ID FROM employees WHERE Salary > 75000 AND Project = 'Web Development'";
            ResultSet rsHighSalary = stmt.executeQuery(queryHighSalaryWebDev);
            System.out.println("\nEmployees in 'Web Development' with Salary > 75,000:");
            System.out.println("ID");
            while (rsHighSalary.next()) {
                System.out.println(rsHighSalary.getInt("ID"));
            }

            // iv. Display the total number of employees who have salary less than 50,000
            String queryLowSalaryCount = "SELECT COUNT(*) AS total FROM employees WHERE Salary < 50000";
            ResultSet rsTotalLowSalary = stmt.executeQuery(queryLowSalaryCount);
            if (rsTotalLowSalary.next()) {
                System.out.println("\nTotal number of employees with Salary < 50,000: " + rsTotalLowSalary.getInt("total"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close resources
            try {
                if (stmt != null)
                    stmt.close();
                if (conn != null)
                    conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}`,
  "2c": `package AdvJava.week2;

import java.sql.*;

public class P3CarDB {

    // Database URL, username, and password
    private static final String DB_URL = "jdbc:mysql://localhost:3306/dbName", USER = "root", PASS = ""; // Update this

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;

        try {
            // Establish the connection
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();

            // Create the cars table if it does not exist
            String createTableSQL = "CREATE TABLE IF NOT EXISTS cars (" +
                    "Model VARCHAR(50) PRIMARY KEY, " +
                    "Company VARCHAR(50), " +
                    "Price DECIMAL(10, 2), " +
                    "Year INT)";
            stmt.executeUpdate(createTableSQL);
            System.out.println("Table 'cars' created or already exists.");

            // Insert sample data
            String insertDataSQL = "INSERT INTO cars (Model, Company, Price, Year) VALUES " +
                    "('ABC', 'Ford', 150000, 2010), " +
                    "('BCD', 'Tata', 120000, 2015), " +
                    "('CDE', 'Kia', 150000, 2018), " +
                    "('DEF', 'MG', 200000, 2020)";
            stmt.executeUpdate(insertDataSQL);
            System.out.println("Sample data inserted into 'cars' table.");

            // i. Display details of all the Cars from the table
            String queryAllCars = "SELECT * FROM cars";
            ResultSet rsAll = stmt.executeQuery(queryAllCars);
            System.out.println("\nAll Cars:");
            printResultSet(rsAll);

            // ii. Insert a new row into the table and display all the details
            String insertNewCar = "INSERT INTO cars (Model, Company, Price, Year) VALUES " +
                    "('EFG', 'Hyundai', 130000, 2021)";
            stmt.executeUpdate(insertNewCar);
            System.out.println("\nNew car inserted:");
            ResultSet rsNewCar = stmt.executeQuery(queryAllCars);
            printResultSet(rsNewCar);

            // iii. Delete a row from the table where the Model="ABC" and Year=2010
            String deleteCar = "DELETE FROM cars WHERE Model='ABC' AND Year=2010";
            stmt.executeUpdate(deleteCar);
            System.out.println("\nCar with Model 'ABC' and Year '2010' deleted.");

            // Display all cars after deletion
            ResultSet rsAfterDelete = stmt.executeQuery(queryAllCars);
            System.out.println("\nAll Cars after deletion:");
            printResultSet(rsAfterDelete);

            // iv. Update the price of a row from 150000 to 125000
            String updatePrice = "UPDATE cars SET Price = 125000 WHERE Model='CDE'";
            stmt.executeUpdate(updatePrice);
            System.out.println("\nPrice updated for Model 'CDE'.");

            // Display all cars after the update
            ResultSet rsAfterUpdate = stmt.executeQuery(queryAllCars);
            System.out.println("\nAll Cars after updating the price:");
            printResultSet(rsAfterUpdate);

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close resources
            try {
                if (stmt != null)
                    stmt.close();
                if (conn != null)
                    conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    private static void printResultSet(ResultSet rs) throws SQLException {
        System.out.println("Model\tCompany\tPrice\t\tYear");
        while (rs.next()) {
            System.out.println(rs.getString("Model") + "\t" +
                    rs.getString("Company") + "\t" +
                    rs.getBigDecimal("Price") + "\t" +
                    rs.getInt("Year"));
        }
    }
}`,
  "3a": `package AdvJava.week3;

import java.sql.*;
import java.util.Scanner;

public class P1DepartmentDB {

    // Database URL, username, and password
    private static final String DB_URL = "jdbc:mysql://localhost:3306/dbName", USER = "root", PASS = ""; // Update this

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;
        Scanner sc = new Scanner(System.in);

        try {
            // Establish the connection
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();

            // Create the Department table if it does not exist
            String createTableSQL = "CREATE TABLE IF NOT EXISTS Department (" +
                    "Dept_ID INT PRIMARY KEY, " +
                    "Name VARCHAR(100), " +
                    "Year_Established INT, " +
                    "Head_Name VARCHAR(100), " +
                    "No_of_Employees INT)";
            stmt.executeUpdate(createTableSQL);
            System.out.println("Table 'Department' created or already exists.");

            // Insert sample data
            String insertDataSQL = "INSERT INTO Department (Dept_ID, Name, Year_Established, Head_Name, No_of_Employees) VALUES " +
                    "(1, 'CSE', 2000, 'Anika', 30), " +
                    "(2, 'ISE', 2000, 'Rahul', 33), " +
                    "(3, 'Mech', 1995, 'Priya', 29), " +
                    "(4, 'Civil', 1995, 'Vivek', 35)";
            stmt.executeUpdate(insertDataSQL);
            System.out.println("Sample data inserted into 'Department' table.");

            // i. Display details of all the Departments using Statement Object
            String queryAllDepartments = "SELECT * FROM Department";
            try (ResultSet rsAll = stmt.executeQuery(queryAllDepartments)) {
                System.out.println("\nAll Departments:");
                printResultSet(rsAll);
            }

            // ii. Display details of all the Departments which are established in the year 2000 using PreparedStatement object
            System.out.print("\nEnter the year to filter departments: ");
            int year = sc.nextInt();
            String queryByYear = "SELECT * FROM Department WHERE Year_Established = ?";
            try (PreparedStatement pStmt = conn.prepareStatement(queryByYear)) {
                pStmt.setInt(1, year);
                try (ResultSet rsByYear = pStmt.executeQuery()) {
                    System.out.println("\nDepartments established in the year " + year + ":");
                    printResultSet(rsByYear);
                }
            }

            // iii. Display details of all Departments by reading Dept_ID and Department Name from the user using PreparedStatement object
            System.out.print("\nEnter Dept_ID to filter departments: ");
            int deptId = sc.nextInt();
            sc.nextLine(); // Consume newline
            System.out.print("Enter Department Name to filter departments: ");
            String deptName = sc.nextLine();
            String queryByIdAndName = "SELECT * FROM Department WHERE Dept_ID = ? AND Name = ?";
            try (PreparedStatement pStmt = conn.prepareStatement(queryByIdAndName)) {
                pStmt.setInt(1, deptId);
                pStmt.setString(2, deptName);
                try (ResultSet rsByIdAndName = pStmt.executeQuery()) {
                    System.out.println("\nDepartments with Dept_ID " + deptId + " and Name " + deptName + ":");
                    printResultSet(rsByIdAndName);
                }
            }

            // iv. Insert a new row using PreparedStatement object. Display the details
            System.out.print("\nEnter new Dept_ID: ");
            int newDeptId = sc.nextInt();
            sc.nextLine(); // Consume newline
            System.out.print("Enter new Department Name: ");
            String newDeptName = sc.nextLine();
            System.out.print("Enter Year Established: ");
            int newYearEstablished = sc.nextInt();
            sc.nextLine(); // Consume newline
            System.out.print("Enter Head Name: ");
            String newHeadName = sc.nextLine();
            System.out.print("Enter Number of Employees: ");
            int newNoOfEmployees = sc.nextInt();

            String insertSQL = "INSERT INTO Department (Dept_ID, Name, Year_Established, Head_Name, No_of_Employees) VALUES (?, ?, ?, ?, ?)";
            try (PreparedStatement pStmt = conn.prepareStatement(insertSQL)) {
                pStmt.setInt(1, newDeptId);
                pStmt.setString(2, newDeptName);
                pStmt.setInt(3, newYearEstablished);
                pStmt.setString(4, newHeadName);
                pStmt.setInt(5, newNoOfEmployees);
                pStmt.executeUpdate();
                System.out.println("New department inserted successfully.");
            }

            // Display the inserted row
            String queryNewDept = "SELECT * FROM Department WHERE Dept_ID = ?";
            try (PreparedStatement pStmt = conn.prepareStatement(queryNewDept)) {
                pStmt.setInt(1, newDeptId);
                try (ResultSet rsNewDept = pStmt.executeQuery()) {
                    System.out.println("\nInserted Department:");
                    printResultSet(rsNewDept);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close resources
            try {
                if (stmt != null)
                    stmt.close();
                if (conn != null)
                    conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            sc.close();
        }
    }
    
    private static void printResultSet(ResultSet rs) throws SQLException {
        System.out.println("ID\tName\tYear_Established\tHead_Name\tNo_of_Employees");
        while (rs.next()) {
            System.out.println(rs.getInt("Dept_ID") + "\t" +
                    rs.getString("Name") + "\t\t" +
                    rs.getInt("Year_Established") + "\t\t" +
                    rs.getString("Head_Name") + "\t\t" +
                    rs.getInt("No_of_Employees"));
        }
    }
}`,
  "3b": `package AdvJava.week3;

import java.sql.*;

public class P2SubjectDB {

    // Database URL, username, and password
    private static final String DB_URL = "jdbc:mysql://localhost:3306/dbName", USER = "root", PASS = ""; // Update this

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;
        PreparedStatement pStmt = null;

        try {
            // Establish the connection
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

            // Create the Subject table if it does not exist
            String createTableSQL = "CREATE TABLE IF NOT EXISTS Subject (" +
                    "Code VARCHAR(10) PRIMARY KEY, " +
                    "Name VARCHAR(100), " +
                    "Department VARCHAR(100), " +
                    "Credits INT)";
            stmt.executeUpdate(createTableSQL);
            System.out.println("Table 'Subject' created or already exists.");
            
            // Insert sample data
            String insertDataSQL = "INSERT INTO Subject (Code, Name, Department, Credits) VALUES " +
                    "('CS50', 'System Programming', 'CSE', 3), " +
                    "('CSL57', 'Database Sys Lab', 'CSE', 1), " +
                    "('CSL56', 'Java  Programming  Lab', 'CSE', 1), " +
                    "('HS59', 'Environmental Studies', 'Civil', 0)";
            stmt.executeUpdate(insertDataSQL);
            System.out.println("Sample data inserted into 'Subject' table.");

            // i. Update the Name of the subject from “Java Programming Lab” to “Advanced Java Programming Lab” with Code as CSL56
            String selectSQL = "SELECT * FROM Subject WHERE Code = 'CSL56'";
            ResultSet rs = stmt.executeQuery(selectSQL);
            if (rs.next()) {
                rs.updateString("Name", "Adv Java Prog Lab");
                rs.updateRow();
                System.out.println("\nSubject name updated successfully.");
            }

            // ii. Delete the subject “System Programming” from the table. Use PreparedStatement Object
            String deleteSQL = "DELETE FROM Subject WHERE Name = ?";
            pStmt = conn.prepareStatement(deleteSQL);
            pStmt.setString(1, "System Programming");
            int rowsAffected = pStmt.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("\nSubject 'System Programming' deleted successfully.");
            } else {
                System.out.println("\nSubject 'System Programming' not found.");
            }

            // iii. Display details of all the Subjects
            String queryAllSubjects = "SELECT * FROM Subject";
            rs = stmt.executeQuery(queryAllSubjects);
            System.out.println("\nCode\tName\t\t\tDepartment\tCredits");
            while (rs.next()) {
                System.out.println(rs.getString("Code") + "\t" +
                        rs.getString("Name") + "\t" +
                        rs.getString("Department") + "\t\t" +
                        rs.getInt("Credits"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close resources
            try {
                if (stmt != null)
                    stmt.close();
                if (pStmt != null)
                    pStmt.close();
                if (conn != null)
                    conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

}`,
  "3c": `package AdvJava.week3;

import java.sql.*;

public class P3MoviesDB {

    // Database URL, username, and password
    private static final String DB_URL = "jdbc:mysql://localhost:3306/dbName", USER = "root", PASS = ""; // Update this

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;
        PreparedStatement pStmt = null;

        try {
            // Establish the connection
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

            // Create the Movies table if it does not exist
            String createTableSQL = "CREATE TABLE IF NOT EXISTS Movies (" +
                    "ID INT PRIMARY KEY, " +
                    "Movie_Name VARCHAR(100), " +
                    "Genre VARCHAR(50), " +
                    "IMDB_Rating FLOAT, " +
                    "Year INT)";
            stmt.executeUpdate(createTableSQL);
            System.out.println("Table 'Movies' created or already exists.");

            // Insert sample data
            String insertDataSQL = "INSERT INTO Movies (ID, Movie_Name, Genre, IMDB_Rating, Year) VALUES " +
                    "(1, 'Inception', 'Sci-Fi', 8.8, 2010), " +
                    "(2, 'Orphan   ', 'Mystery', 7.0, 2009), " +
                    "(3, 'Interstellar', 'Sci-Fi', 8.6, 2014), " +
                    "(4, 'La La Land', 'Musical', 8.0, 2016), " +
                    "(5, 'Gifted   ', 'Drama', 7.6, 2017)";
            stmt.executeUpdate(insertDataSQL);
            System.out.println("Sample data inserted into 'Movies' table.");

            // i. Display details of all the Movies from the table
            String queryAllMovies = "SELECT * FROM Movies";
            ResultSet rs = stmt.executeQuery(queryAllMovies);
            printResultSet(rs);

            // ii. Display details of 5th Movie from the table
            if (rs.absolute(5)) {
                System.out.println("\nDetails of 5th Movie:");
                System.out.println("ID\tMovie_Name\tGenre\tIMDB_Rating\tYear");
                System.out.println(rs.getInt("ID") + "\t" +
                        rs.getString("Movie_Name") + "\t" +
                        rs.getString("Genre") + "\t\t" +
                        rs.getFloat("IMDB_Rating") + "\t" +
                        rs.getInt("Year"));
            }

            // iii. Insert a new row into the table using PreparedStatement and display all the details
            String insertSQL = "INSERT INTO Movies (ID, Movie_Name, Genre, IMDB_Rating, Year) VALUES (?, ?, ?, ?, ?)";
            pStmt = conn.prepareStatement(insertSQL);
            pStmt.setInt(1, 6);
            pStmt.setString(2, "Morning Glory");
            pStmt.setString(3, "Rom-Com");
            pStmt.setFloat(4, 6.5f);
            pStmt.setInt(5, 2010);
            pStmt.executeUpdate();
            System.out.println("\nNew movie inserted successfully.");

            // Display all the details
            rs = stmt.executeQuery(queryAllMovies);
            printResultSet(rs);

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close resources
            try {
                if (stmt != null)
                    stmt.close();
                if (pStmt != null)
                    pStmt.close();
                if (conn != null)
                    conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    private static void printResultSet(ResultSet rs) throws SQLException {
        System.out.println("\nAll movies:\nID\tMovie_Name\tGenre\tIMDB_Rating\tYear");
        while (rs.next()) {
            System.out.println(rs.getInt("ID") + "\t" +
                    rs.getString("Movie_Name") + "\t" +
                    rs.getString("Genre") + "\t\t" +
                    rs.getFloat("IMDB_Rating") + "\t" +
                    rs.getInt("Year"));
        }
    }
}`,
  "4a": `package AdvJava.week3;

import java.sql.*;

public class P3MoviesDB {

    // Database URL, username, and password
    private static final String DB_URL = "jdbc:mysql://localhost:3306/dbName", USER = "root", PASS = ""; // Update this

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;
        PreparedStatement pStmt = null;

        try {
            // Establish the connection
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);

            // Create the Movies table if it does not exist
            String createTableSQL = "CREATE TABLE IF NOT EXISTS Movies (" +
                    "ID INT PRIMARY KEY, " +
                    "Movie_Name VARCHAR(100), " +
                    "Genre VARCHAR(50), " +
                    "IMDB_Rating FLOAT, " +
                    "Year INT)";
            stmt.executeUpdate(createTableSQL);
            System.out.println("Table 'Movies' created or already exists.");

            // Insert sample data
            String insertDataSQL = "INSERT INTO Movies (ID, Movie_Name, Genre, IMDB_Rating, Year) VALUES " +
                    "(1, 'Inception', 'Sci-Fi', 8.8, 2010), " +
                    "(2, 'Orphan   ', 'Mystery', 7.0, 2009), " +
                    "(3, 'Interstellar', 'Sci-Fi', 8.6, 2014), " +
                    "(4, 'La La Land', 'Musical', 8.0, 2016), " +
                    "(5, 'Gifted   ', 'Drama', 7.6, 2017)";
            stmt.executeUpdate(insertDataSQL);
            System.out.println("Sample data inserted into 'Movies' table.");

            // i. Display details of all the Movies from the table
            String queryAllMovies = "SELECT * FROM Movies";
            ResultSet rs = stmt.executeQuery(queryAllMovies);
            printResultSet(rs);

            // ii. Display details of 5th Movie from the table
            if (rs.absolute(5)) {
                System.out.println("\nDetails of 5th Movie:");
                System.out.println("ID\tMovie_Name\tGenre\tIMDB_Rating\tYear");
                System.out.println(rs.getInt("ID") + "\t" +
                        rs.getString("Movie_Name") + "\t" +
                        rs.getString("Genre") + "\t\t" +
                        rs.getFloat("IMDB_Rating") + "\t" +
                        rs.getInt("Year"));
            }

            // iii. Insert a new row into the table using PreparedStatement and display all the details
            String insertSQL = "INSERT INTO Movies (ID, Movie_Name, Genre, IMDB_Rating, Year) VALUES (?, ?, ?, ?, ?)";
            pStmt = conn.prepareStatement(insertSQL);
            pStmt.setInt(1, 6);
            pStmt.setString(2, "Morning Glory");
            pStmt.setString(3, "Rom-Com");
            pStmt.setFloat(4, 6.5f);
            pStmt.setInt(5, 2010);
            pStmt.executeUpdate();
            System.out.println("\nNew movie inserted successfully.");

            // Display all the details
            rs = stmt.executeQuery(queryAllMovies);
            printResultSet(rs);

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close resources
            try {
                if (stmt != null)
                    stmt.close();
                if (pStmt != null)
                    pStmt.close();
                if (conn != null)
                    conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    private static void printResultSet(ResultSet rs) throws SQLException {
        System.out.println("\nAll movies:\nID\tMovie_Name\tGenre\tIMDB_Rating\tYear");
        while (rs.next()) {
            System.out.println(rs.getInt("ID") + "\t" +
                    rs.getString("Movie_Name") + "\t" +
                    rs.getString("Genre") + "\t\t" +
                    rs.getFloat("IMDB_Rating") + "\t" +
                    rs.getInt("Year"));
        }
    }
}`,
  "4b": `package AdvJava.week4;

import java.sql.*;

public class P2BankAccountDB {

    // Database URL, username, and password
    private static final String DB_URL = "jdbc:mysql://localhost:3307/dbName", USER = "root", PASS = ""; // Update this

    public static void main(String[] args) {
        Connection conn = null;
        PreparedStatement pStmt = null;
        Statement stmt = null;

        try {
            // Establish the connection
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = conn.createStatement();

            // Create the Bank_Account table if it does not exist
            String createTableSQL = "CREATE TABLE IF NOT EXISTS Bank_Account (" +
                    "Account_No INT PRIMARY KEY, " +
                    "Account_Name VARCHAR(100), " +
                    "Type_of_Account VARCHAR(50), " +
                    "Balance INT)";
            stmt.executeUpdate(createTableSQL);
            System.out.println("Table 'Bank_Account' created or already exists.");

            // i. Insert rows using PreparedStatement
            String insertSQL = "INSERT INTO Bank_Account (Account_No, Account_Name, Type_of_Account, Balance) VALUES (?, ?, ?, ?)";
            pStmt = conn.prepareStatement(insertSQL);
            pStmt.setInt(1, 1);
            pStmt.setString(2, "Raj");
            pStmt.setString(3, "Savings");
            pStmt.setInt(4, 1500);
            pStmt.executeUpdate();

            pStmt.setInt(1, 2);
            pStmt.setString(2, "Riya");
            pStmt.setString(3, "Current");
            pStmt.setInt(4, 2500);
            pStmt.executeUpdate();

            System.out.println("Sample data inserted into 'Bank_Account' table.");

            // ii. Display details of all the Accounts
            String queryAllAccounts = "SELECT * FROM Bank_Account";
            ResultSet rs = stmt.executeQuery(queryAllAccounts);
            printAccountResultSet(rs);

            // iii. Demonstrate the Working of Rollback and Commit
            conn.setAutoCommit(false);
            try {
                pStmt.setInt(1, 6);
                pStmt.setString(2, "Anu");
                pStmt.setString(3, "Savings");
                pStmt.setInt(4, 500);
                pStmt.executeUpdate();

                pStmt.setInt(1, 7);
                pStmt.setString(2, "Sam");
                pStmt.setString(3, "Current");
                pStmt.setInt(4, 700);
                pStmt.executeUpdate();

                System.out.println("\nRows inserted, committing transaction.");
                conn.commit();
            } catch (SQLException e) {
                System.out.println("\nException occurred, rolling back transaction.");
                conn.rollback();
                e.printStackTrace();
            }

            // iv. Demonstrate the Working of SavePoints
            Savepoint savepoint1 = conn.setSavepoint("Savepoint1");
            try {
                pStmt.setInt(1, 8);
                pStmt.setString(2, "Tanu");
                pStmt.setString(3, "Savings");
                pStmt.setInt(4, 900);
                pStmt.executeUpdate();

                pStmt.setInt(1, 9);
                pStmt.setString(2, "Tarun");
                pStmt.setString(3, "Current");
                pStmt.setInt(4, 1100);
                pStmt.executeUpdate();

                System.out.println("\nRows inserted, rolling back to Savepoint1.");
                conn.rollback(savepoint1);

                System.out.println("\nRows inserted, committing transaction.");
                conn.commit();
            } catch (SQLException e) {
                System.out.println("\nException occurred, rolling back transaction.");
                conn.rollback();
                e.printStackTrace();
            }

            // Display all the details after rollback and commit
            rs = stmt.executeQuery(queryAllAccounts);
            printAccountResultSet(rs);

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close resources
            try {
                if (stmt != null)
                    stmt.close();
                if (pStmt != null)
                    pStmt.close();
                if (conn != null)
                    conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    private static void printAccountResultSet(ResultSet rs) throws SQLException {
        System.out.println("\nAccount_No\tAccount_Name\tType_of_Account\tBalance");
        while (rs.next()) {
            System.out.println(rs.getInt("Account_No") + "\t" +
                    rs.getString("Account_Name") + "\t" +
                    rs.getString("Type_of_Account") + "\t" +
                    rs.getInt("Balance"));
        }
    }
}`,
  "5a": `// Greeting.java

package myPack;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.*;
//import jakarta.servlet.annotation.*;

//@WebServlet("/Greeting")
public class Greeting extends HttpServlet {
	private static final long serialVersionUID = 1L;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String name = request.getParameter("name");
        String pass = request.getParameter("pass");
        String repass = request.getParameter("repass");

        response.getWriter().println("<html><body>");
        if (pass.equals(repass) && pass.length() >= 8) {
	        response.getWriter().println("<h1>Registered, " + name + "!</h1>");
        } else {
	        response.getWriter().println("<h1>Enter matching passwords of length atleast 8, " + name + "!</h1>");
        }
        response.getWriter().println("</body></html>");
    }
}

<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
</head>
<body>
    <h1>Registration Page</h1>
    <form action="Greeting" method="POST">
        <label for="name">UserName:</label>
        <input type="text" id="name" name="name" required>
        <label for="pass">Password:</label>
        <input type="password" id="pass" name="pass" required>
        <label for="repass">Re-enter Password:</label>
        <input type="password" id="repass" name="repass" required>
        <input type="submit" value="Submit">
    </form>
</body>
</html>`,
  "5b": `// Voting.java

package myPack;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.*;
//import jakarta.servlet.annotation.*;

//@WebServlet("/Voting")
public class Voting extends HttpServlet {
	private static final long serialVersionUID = 1L;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String fname = request.getParameter("fname");
        String lname = request.getParameter("lname");
        String age = request.getParameter("age");

        response.getWriter().println("<html><body>");
        if (Integer.parseInt(age) >= 18) {
	        response.getWriter().println("<h1>You are eligible, " + fname + " " + lname + "!</h1>");
        } else {
	        response.getWriter().println("<h1>You are not eligible, " + fname + " " + lname + "!</h1>");
        }
        response.getWriter().println("</body></html>");
    }
}

<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Vote</title>
    </head>
    <body>
        <h1>Voting Page</h1>
        <form action="Voting" method="POST">
            <label for="fname">First Name:</label>
            <input type="text" id="fname" name="fname" required>
            <label for="lname">Last Name:</label>
            <input type="text" id="lname" name="lname" required>
            <label for="mail">E-mail:</label>
            <input type="text" id="mail" name="mail" required>
            <label for="age">Age:</label>
            <input type="text" id="age" name="age" required>
            <input type="submit" value="Submit">
        </form>
    </body>
</html>`,
  "5c": `// Calculate.java

package myPack;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.*;
//import jakarta.servlet.annotation.*;

//@WebServlet("/Calculate")
public class Calculate extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		float sum = 0;
		float avg = 0;
		for(int i =0;i<4;i++) {
			sum+= Float.parseFloat(request.getParameter("cgpa"+Integer.toString(i+1)));
		}
		avg = sum/ 4;
		response.getWriter().println("<html><body>");
		response.getWriter().println("<h1> the CGPA is  " + String.valueOf(avg) + "</h1>");
		response.getWriter().println("</body></html>");
	}

}

<!-- index.html -->

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Calculate CGPA</title>
	</head>
	<body>
		<form method = "post" action ="Calculate">
			<h1>CGPA DETAILS :</h1>
			<p>Enter USN :</p>
			<input name = "usn" type = "text" required>
			<p>Enter name :</p>
			<input name = "name" type = "text" required>
			<p>Enter all SGPAS's :</p>
			<input name = "cgpa1" type = "text" required>
			<input name = "cgpa2" type = "text" required>
			<input name = "cgpa3" type = "text" required>
			<input name = "cgpa4" type = "text" required>
			<input type = "submit" value ="submit">
		</form>
	</body>
</html>`,
};

export default data;
