import { useEffect, useState } from "react";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchEmployees = () => {
    fetch("http://localhost:3000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = () => {
    if (!name || !role) return;

    fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, role }),
    }).then(() => {
      fetchEmployees();
      setName("");
      setRole("");
    });
  };

  const deleteEmployee = (id) => {
    fetch(`http://localhost:3000/employees/${id}`, {
      method: "DELETE",
    }).then(() => fetchEmployees());
  };

  const editEmployee = (emp) => {
    setName(emp.name);
    setRole(emp.role);
    setEditId(emp.id);
  };

  const updateEmployee = () => {
    fetch(`http://localhost:3000/employees/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, role }),
    }).then(() => {
      fetchEmployees();
      setName("");
      setRole("");
      setEditId(null);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 p-4 sm:p-8">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-8 border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Employee Management
        </h2>
        <p className="text-gray-600 mt-1">
          Add, edit and manage employees easily.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {editId ? (
            <button
              onClick={updateEmployee}
              className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition shadow-md"
            >
              Update
            </button>
          ) : (
            <button
              onClick={addEmployee}
              className="bg-indigo-500 text-white px-6 py-3 rounded-xl hover:bg-indigo-600 transition shadow-md"
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200">
        {employees.length === 0 ? (
          <p className="text-gray-500 text-center">No employees found</p>
        ) : (
          <div className="space-y-4">
            {employees.map((emp) => (
              <div
                key={emp.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <div>
                  <p className="text-gray-800 font-semibold">{emp.name}</p>
                  <p className="text-gray-500 text-sm">{emp.role}</p>
                </div>

                <div className="flex gap-2 mt-3 sm:mt-0">
                  <button
                    onClick={() => editEmployee(emp)}
                    className="bg-yellow-400 text-white px-4 py-1 rounded-lg hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Employees;
