-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

-- 2. Create Teacher Table
CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL
);

-- 3. Create Class Table
-- Note: teacher_id links to teachers(id)
CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    teacher_id INT,
    class_type ENUM('primary', 'elementary', 'high') NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL
);

-- 4. Create Student Table
-- Note: class_id links to classes(id)
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);

-- --- INSERT SAMPLE DATA ---

-- Add Teachers
INSERT INTO teachers (name, department_id) VALUES 
('Alice Johnson', 101),
('Bob Smith', 102),
('Charlie Davis', 103);

-- Add Classes (Linking to Teacher IDs 1, 2, and 3)
INSERT INTO classes (name, teacher_id, class_type) VALUES 
('Grade 1-A', 1, 'primary'),
('Math 101', 2, 'elementary'),
('Physics Advanced', 3, 'high');
-- Add Students (Linking to Class IDs 1, 2, and 3)
INSERT INTO students (name, phone_number, class_id) VALUES 
('John Doe', '555-0101', 1),
('Jane Miller', '555-0202', 2),
('Sam Wilson', '555-0303', 3);