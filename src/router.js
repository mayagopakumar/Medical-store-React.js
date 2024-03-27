import { createBrowserRouter } from "react-router-dom";
import Register from "./component/auth/register";
import App from "./App";
import Login from "./component/auth/login";
import ListMedicines from "./component/crud/listItem";
import CreateMedicine from "./component/crud/createList";
import ViewMedicine from "./component/crud/viewItem";
import EditMedicine from "./component/crud/editList";


const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'register', element: <Register/> },
    { path: '/crud/medicines', element: <ListMedicines/>},
    { path: '/crud/medicines/create', element:<CreateMedicine/>},
    { path: '/crud/medicines/:medicineId', element:<ViewMedicine/>},
    { path : '/crud/medicines/:medicineId/edit', element: <EditMedicine/>},
    { path: '/login', element:<Login/>}
    
]);

export default router;