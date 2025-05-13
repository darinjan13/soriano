import { useState } from 'react';
import StudentList from './components/StudentList';
import StudentFormModal from './components/StudentFormModal';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          📋 Student Information System
        </h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          ➕ Add Student
        </button>
      </div>

      <StudentList refreshTrigger={refresh} />

      {showModal && (
        <StudentFormModal
          onClose={() => setShowModal(false)}
          onStudentSaved={() => {
            setRefresh(!refresh);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
