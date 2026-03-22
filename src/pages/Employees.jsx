import { useEffect, useState } from "react";
import { getEmployees, addEmployee, deleteEmployee } from "../services/api";
import EmployeeTable from "../components/EmployeeTable";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const loadEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleAdd = async () => {
    if (!name || !role) return;
    await addEmployee({ name, role });
    setName("");
    setRole("");
    loadEmployees();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 pt-24 px-4 sm:px-8">
      {/* Table */}
      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 overflow-x-auto">
        <EmployeeTable employees={employees} deleteEmployee={handleDelete} />
      </div>
    </div>
  );
}

export default Employees;
