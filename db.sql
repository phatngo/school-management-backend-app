-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

-- 2. Create Teacher Table
CREATE TABLE teacher (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL
);

-- 3. Create Class Table
-- Note: teacher_id links to teacher(id)
CREATE TABLE class (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    teacher_id INT,
    class_type ENUM('primary', 'elementary', 'high') NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id) ON DELETE SET NULL
);

-- 4. Create Student Table
-- Note: class_id links to class(id)
CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES class(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    api_key VARCHAR(36) NOT NULL UNIQUE, -- Store UUIDs here
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --- INSERT SAMPLE DATA ---

-- Add Teachers
INSERT INTO teacher (name, department_id) VALUES 
('Alice Johnson', 101),
('Bob Smith', 102),
('Charlie Davis', 103);

-- Add Classes (Linking to Teacher IDs 1, 2, and 3)
INSERT INTO class (name, teacher_id, class_type) VALUES 
('Grade 1-A', 1, 'primary'),
('Math 101', 2, 'elementary'),
('Physics Advanced', 3, 'high');

-- Add Students (Linking to Class IDs 1, 2, and 3)
INSERT INTO student (name, phone_number, class_id) VALUES 
('John Doe', '555-0101', 1),
('Jane Miller', '555-0202', 2),
('Sam Wilson', '555-0303', 3);

-- Sample users with UUIDs
INSERT INTO user (username, api_key) VALUES 
('admin_user', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
('test', 'bc9e4776-8800-474d-9377-5264a66a15e6');