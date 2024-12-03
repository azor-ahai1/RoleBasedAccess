import React, { useState, useEffect } from 'react';
import { 
  FaUser , 
  FaEnvelope, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaProjectDiagram,
  FaPlus,
  FaExclamationCircle,
  FaArrowLeft
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Mock data generator
const generateMockUsers = () => {
  const projects = [
    'Cybersecurity Audit',
    'Cloud Infrastructure Security',
    'Network Penetration Testing',
    'Compliance Framework',
    'Data Protection Strategy',
    'IoT Security Assessment',
    'Enterprise Firewall Upgrade'
  ];

  return Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `User  ${index + 1}`,
    email: `user${index + 1}@example.com`,
    projects: projects
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1),
    status: index % 4 === 0 ? 'Inactive' : 'Active',
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
    profileImage: `https://i.pravatar.cc/150?u=${index + 1}`
  }));
};

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Available projects
  const allProjects = [
    'Cybersecurity Audit',
    'Cloud Infrastructure Security',
    'Network Penetration Testing',
    'Compliance Framework',
    'Data Protection Strategy',
    'IoT Security Assessment',
    'Enterprise Firewall Upgrade'
  ];

  // Load users on component mount
  useEffect(() => {
    try {
      setIsLoading(true);
      const mockUsers = generateMockUsers();
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load users');
      setIsLoading(false);
    }
  }, []);

  // Search and filter users
  useEffect(() => {
    let result = users;

    // Apply search
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply project filter
    if (selectedProject) {
      result = result.filter(user => 
        user.projects.includes(selectedProject)
      );
    }

    // Apply status filter
    if (selectedStatus) {
      result = result.filter(user => 
        user.status === selectedStatus
      );
    }

    setFilteredUsers(result);
    setCurrentPage(1);
  }, [searchTerm, selectedProject, selectedStatus, users]);

  // Pagination logic
  const indexOfLastUser  = currentPage * usersPerPage;
  const indexOfFirstUser  = indexOfLastUser  - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser , indexOfLastUser );

  // Handler for user click
  const handleUserClick = (user) => {
    navigate(`/users/${user.id}`, { state: { user } });
  };

  // Handler for user actions
  const handleUserAction = (action, user, e) => {
    e.stopPropagation();
    switch(action) {
      case 'view':
        navigate(`/users/${user.id}/view`);
        break;
      case 'edit':
        navigate(`/users/${user.id}/edit`);
        break;
      case 'delete':
        // Implement delete logic or modal
        console.log('Delete user', user);
        break;
      default:
        break;
    }
  };

  // Render loading or error state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-background">
        <div className="text-light-blue text-2xl flex items-center">
          <svg className="animate-spin h-8 w-8 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading Users...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-background">
        <div className="text-red-500 text-2xl flex items-center">
          <FaExclamationCircle className="mr-3" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-background p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-dark-primary/80 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-slate-gray/30">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <h1 className="text-xl md:text-3xl font-bold text-light-blue flex items-center">
              <button 
                  onClick={() => navigate('/admin/dashboard')}
                  className="text-light-blue hover:text-white mr-5"
                  aria-label="Go back to admin list"
              >
                  <FaArrowLeft className="text-xl" />
              </button>
              <FaUser className="mr-3 text-light-blue/70" />
              User Management
            </h1>
            <button 
              className="flex items-center space-x-2 
              bg-light-blue text-dark-primary 
              px-4 py-2 rounded-lg 
              hover:bg-opacity-90 
              transition-all duration-300 
              transform hover:scale-105 
              focus:outline-none focus:ring-2 focus:ring-light-blue/50"
              onClick={() => navigate('/users/create')}
            >
              <FaPlus />
              <span className="hidden sm:inline">Add New User</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg 
                bg-dark-primary/80 border border-slate-gray/80 
                text-light-blue 
                focus:outline-none focus:ring-2 focus:ring-light-blue/10 
                transition-all duration-300" 
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <select 
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg 
              bg-dark-primary/80 border border-slate-gray/80 
              text-light-blue 
              focus:outline-none focus:ring-2 focus:ring-light-blue/10"
            >
              <option value="">All Projects</option>
              {allProjects.map((project) => (
                <option key={project} value={project}>{project}</option>))
              }
            </select>

            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg 
              bg-dark-primary/80 border border-slate-gray/80 
              text-light-blue 
              focus:outline-none focus:ring-2 focus:ring-light-blue/10"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-dark-primary/50 border-b border-slate-gray/30">
                  <th className="p-3 text-left text-light-blue hidden md:table-cell">User</th>
                  <th className="p-3 text-left text-light-blue">Email</th>
                  <th className="p-3 text-left text-light-blue hidden lg:table-cell">Projects</th>
                  <th className="p-3 text-left text-light-blue">Status</th>
                  <th className="p-3 text-center text-light-blue">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map(user => (
                  <tr
                    key={user.id}
                    className="hover:bg-dark-primary/30 transition-colors duration-200"
                    onClick={(e) => handleUserAction('view', user, e)}
                    
                  >
                    <td className="p-3 hidden md:flex items-center">
                      <img 
                        src={user.profileImage} 
                        alt="Profile" 
                        className="rounded-full w-10 h-10 mr-4 object-cover" 
                      />
                      <span className="text-light-blue">{user.name}</span>
                    </td>
                    <td className="p-3 text-light-blue">
                      <div className="md:hidden flex items-center mb-2">
                        <img 
                          src={user.profileImage} 
                          alt="Profile" 
                          className="rounded-full w-8 h-8 mr-2 object-cover" 
                        />
                        <span>{user.name}</span>
                      </div>
                      {user.email}
                    </td>
                    <td className="p-3 text-light-blue hidden lg:table-cell">
                      {user.projects.join(', ')}
                    </td>
                    <td className="p-3">
                      <span className={`px-3 py-1 text-sm rounded-full 
                        ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3 flex justify-center space-x-3">
                      <button
                        onClick={(e) => handleUserAction('view', user, e)}
                        className="text-light-blue hover:text-white transition-colors"
                        aria-label="View User"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={(e) => handleUserAction('edit', user, e)}
                        className="text-yellow-400 hover:text-white transition-colors"
                        aria-label="Edit User"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => handleUserAction('delete', user, e)}
                        className="text-red-600 hover:text-white transition-colors"
                        aria-label="Delete User"
                      >
                        <FaTrash /> </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-light-blue">
              Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
            </span>
            <div className="flex space-x-2">
              <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className="bg-light-blue text-dark-primary px-4 py-2 rounded-lg 
                hover:bg-opacity-90 transition-all duration-300 
                disabled:opacity-50"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === Math.ceil(users.length / usersPerPage)}
                className="bg-light-blue text-dark-primary px-4 py-2 rounded-lg 
                hover:bg-opacity-90 transition-all duration-300 
                disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;