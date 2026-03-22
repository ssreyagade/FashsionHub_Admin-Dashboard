import React, { useState } from "react";

const StudentTable = () => {
  const students = [
    { id: 1, name: "Shreya", age: 20, course: "Computer Engineering" },
    { id: 2, name: "Rahul", age: 21, course: "Information Technology" },
    { id: 3, name: "Priya", age: 19, course: "AI & ML" },
  ];

  return (
    <>
      <h2>Student Records</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StudentTable;
