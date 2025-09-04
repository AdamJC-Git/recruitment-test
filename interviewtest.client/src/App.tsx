import { useEffect, useState } from 'react';
import EmployeeApp from './App/EmployeeApp';

function App() {
    const [employeeCount, setEmployeeCount] = useState<number>(0);

    useEffect(() => {
        checkConnectivity();
    }, []);

    return (<>
        <div>Connectivity check: {employeeCount > 0 ? `OK (${employeeCount})` : `NOT READY`}</div>
        <div><EmployeeApp/></div>
    </>);

    async function checkConnectivity() {
        const response = await fetch('api/employees');
        const data = await response.json();
        setEmployeeCount(data.length);
    }
}

export default App;