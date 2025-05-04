import { useState } from 'react';
import axios from 'axios';

export default function StudentFormModal({ onClose, onStudentSaved, student }) {
    const isEdit = !!student;

    const [form, setForm] = useState(
        student || {
            first_name: '',
            last_name: '',
            email: '',
            course: '',
        }
    );

    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setError('');

        try {
            if (isEdit) {
                await axios.put(`http://localhost:8000/students/${student.id}`, form);
            } else {
                await axios.post(`http://localhost:8000/students`, form);
            }
            onStudentSaved();
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors || {});
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };



    return (
        <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-fit shadow-xl relative">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                    {isEdit ? '✏️ Edit Student' : '➕ Register Student'}
                </h3>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                name="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="input w-full"
                            />
                            {errors.first_name && (
                                <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
                            )}
                        </div>

                        <div className="flex-1">
                            <input
                                name="last_name"
                                value={form.last_name}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="input w-full"
                            />
                            {errors.last_name && (
                                <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
                            )}
                        </div>

                        <div className="flex-1">
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="input w-full"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="flex-1">
                            <input
                                name="course"
                                value={form.course}
                                onChange={handleChange}
                                placeholder="e.g., BSIT"
                                className="input w-full"
                            />
                            {errors.course && (
                                <p className="text-red-500 text-xs mt-1">{errors.course}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 pt-2">
                        <button
                            type="button"
                            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            {isEdit ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
