import { useState, useEffect } from "react";
import axios from "axios";

function DataConsult() {
  const [records, setRecords] = useState([]);

  const [filters, setFilters] = useState({
    country: "",
    sender: "",
    category: "",
  });

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get("/records", {
        params: {
          ...filters,
          page,
          page_size: 25,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecords(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching records", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [filters, page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPage(1);
  };

  return (
    <div>
      <h2>SMS Records</h2>

      {/* Filters */}

      <div>
        <input
          name="country"
          placeholder="Country"
          value={filters.country}
          onChange={handleFilterChange}
        />

        <input
          name="sender"
          placeholder="Sender"
          value={filters.sender}
          onChange={handleFilterChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={filters.category}
          onChange={handleFilterChange}
        />
      </div>

      {/* Table */}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Sender</th>
              <th>Country</th>
              <th>Category</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.timestamp}</td>
                <td>{record.sender}</td>
                <td>{record.country}</td>
                <td>{record.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}

      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataConsult;
