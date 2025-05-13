import { useEffect, useState } from 'react';
import axios from 'axios';

import StudentFormModal from './StudentFormModal';

const API_BASE = 'http://localhost:8000';

export default function StudentList({ refreshTrigger }) {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editStudent, setEditStudent] = useState(null);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/students`);
            setStudents(res.data);

        } catch {
            alert("Failed to load student list.");
        } finally {
            setLoading(false);
        }
    };

    const deleteStudent = async (id) => {
        if (confirm("Are you sure you want to delete this student?")) {
            try {
                await axios.delete(`${API_BASE}/students/${id}`);
                fetchStudents();
            } catch {
                alert("Failed to delete student.");
            }
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [refreshTrigger]);

    return (
        <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">🧑 Registered Students</h2>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : students.length === 0 ? (
                <p className="text-gray-400 italic">No student records found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-sm text-gray-700">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3 text-left">Course</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="p-3">{student.first_name} {student.last_name}</td>
                                    <td className="p-3">{student.email}</td>
                                    <td className="p-3">{student.course}</td>
                                    <td className="p-3 text-center space-x-2">
                                        <button
                                            onClick={() => setEditStudent(student)}
                                            className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
                                            onClick={() => deleteStudent(student.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {editStudent && (
                        <StudentFormModal
                            student={editStudent}
                            onClose={() => setEditStudent(null)}
                            onStudentSaved={() => {
                                setEditStudent(null);
                                fetchStudents();
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
