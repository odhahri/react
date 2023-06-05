import axios from 'axios';
import { useEffect, useState } from 'react';


export default function StudentsList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4300/students/');
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Students List</h1>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.Firstname}
          </li>
        ))}
      </ul>
    </div>
  );
}
