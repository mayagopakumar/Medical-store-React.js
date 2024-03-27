import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import PostListItem from "./deleteItem";
import { useSelector } from "react-redux";

function ListMedicines() {
  const [allMedicines, setAllMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const user = useSelector((store) => store.auth.user);
  const token = user?.token || "";

  function fetchMedicines() {
    axios
      .get("https://medicalstore.mashupstack.com/api/medicine", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setAllMedicines(response.data);
        if (searchTerm.trim() !== "") {
          // Filter posts whose names start with the search term's first letter
          const filteredItems = response.data.filter((item) =>
            item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
          );
          setFilteredMedicines(filteredItems);
        } else {
          // If search term is empty, show all posts
          setFilteredMedicines(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
      });
  }

  useEffect(() => {
    if (user && user.token) {
      fetchMedicines();
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchMedicines();
  }, [searchTerm]); // Refetch posts whenever search term changes

  return (
    <div className="body">
      <Navbar />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <form>
              <label>Search Medicine: &nbsp;</label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />{" "}
              &nbsp;
              <button
                className="btn btn-small btn-success"
                type="button"
                onClick={fetchMedicines}
              >
                Search
              </button>
              &nbsp;
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Medicines</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/crud/medicines/create" className="btn btn-info mb-2">
              Create Medicine
            </Link>
            {filteredMedicines.length === 0 ? (
              <p>No matching posts found.</p>
            ) : (
              filteredMedicines.map((medicine) => (
                <PostListItem key={medicine.id} medicine={medicine} refresh={fetchMedicines} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListMedicines;