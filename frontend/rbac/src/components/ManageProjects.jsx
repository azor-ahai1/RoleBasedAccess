import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectAdminAuth } from '../store/authSlice';
import { 
  FaProjectDiagram, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSearch,
  FaFilter,
  FaExclamationCircle,
  FaSpinner,
  FaChevronDown,
  FaChevronUp,
  FaEye,
  FaArrowLeft
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProjectManagementService = {
  fetchProjects: async () => {
    // Expanded mock data generation
    const projectStatuses = [
      'Planned', 
      'In Progress', 
      'Completed', 
      'On Hold'
    ];

    const projectPriorities = [
      'Low', 
      'Medium', 
      'High', 
      'Critical'
    ];

    const clients = [
      'VRV Security Solutions',
      'Global Tech Enterprises', 
      'Financial Innovations Inc.',
      'Healthcare Systems',
      'Innovative Startup Inc.'
    ];

    return Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      name: `Project ${index + 1}`,
      client: clients[Math.floor(Math.random() * clients.length)],
      status: projectStatuses[Math.floor(Math.random() * projectStatuses.length)],
      priority: projectPriorities[Math.floor(Math.random() * projectPriorities.length)],
      startDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
      endDate: new Date(Date.now() + Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
      progress: Math.floor(Math.random() * 100),
      projectManager: `Manager ${Math.floor(Math.random() * 10) + 1}`,
      description: `Comprehensive project description for Project ${index + 1}`,
      profileImage: `https://i.pravatar.cc/150?u=project${index + 1}`
    }));
  },

  deleteProject: async (projectId) => {
    // Simulate delete API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  }
};

const ManageProjects = ({ initialPageSize = 10 }) => {
    const isAdminAuthenticated = useSelector(selectAdminAuth);
    const navigate = useNavigate();
  
    // State Management
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Filtering States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(initialPageSize);
  
    // Fetch Projects
    const fetchProjects = useCallback(async () => {
      try {
        setLoading(true);
        const data = await ProjectManagementService.fetchProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchProjects();
    }, [fetchProjects]);
  
    // Filtering Logic
    const filteredProjects = useMemo(() => {
      return projects.filter(project =>
        (searchTerm === '' ||
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.client.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedStatus === '' || project.status === selectedStatus)
      );
    }, [projects, searchTerm, selectedStatus]);
  
    // Pagination Logic
    const paginatedProjects = useMemo(() => {
      const startIndex = (currentPage - 1) * pageSize;
      return filteredProjects.slice(startIndex, startIndex + pageSize);
    }, [filteredProjects, currentPage, pageSize]);
  
    // Total Pages Calculation
    const totalPages = useMemo(() => {
      return Math.ceil(filteredProjects.length / pageSize);
    }, [filteredProjects, pageSize]);
  
    // Delete Project Handler
    const handleDeleteProject = async (projectId) => {
      try {
        await ProjectManagementService.deleteProject(projectId);
        setProjects(projects.filter(project => project.id !== projectId));
      } catch (err) {
        setError('Failed to delete project');
      }
    };
  
    // Render Project Status Badge
    const renderProjectStatusBadge = (status) => {
      const statusColors = {
        'Completed': 'bg-green-500/20 text-green-400',
        'In Progress': 'bg-yellow-500/20 text-yellow-400',
        'Planned': 'bg-blue-500/20 text-blue-400',
        'On Hold': 'bg-red-500/20 text-red-400'
      };
  
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold 
            ${statusColors[status] || 'bg-gray-500/20 text-gray-400'}`}
        >
          {status}
        </span>
      );
    };
  
    // Render Loading
    if (loading) return <LoadingIndicator />;
  
    // Render Error
    if (error) return <ErrorDisplay message={error} />;
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-background via-dark-primary to-dark-background p-4 md:p-6 lg:p-8 selection:bg-light-blue selection:text-dark-primary">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-7xl space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-dark-primary/30 rounded-xl p-4 shadow-md border border-slate-gray/20">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <button 
                  onClick={() => navigate('/admin/dashboard')}
                  className="text-light-blue hover:text-white mr-5"
                  aria-label="Go back to admin list"
              >
                  <FaArrowLeft className="text-xl" />
              </button>
              <FaProjectDiagram className="text-3xl text-light-blue/80 animate-pulse" />
              <h1 className="text-2xl font-bold text-light-blue tracking-wide">
                Project Management
              </h1>
            </div>
            {isAdminAuthenticated && (
                <button
                    onClick={() => navigate('/project/create')}
                    className="group w-full md:w-auto flex items-center justify-center 
                    bg-light-blue text-dark-primary px-6 py-3 rounded-lg 
                    hover:bg-opacity-90 transition-all duration-300 
                    transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue"
                >
                    <FaPlus className="mr-2 group-hover:rotate-180 transition-transform" />
                    Create New Project
                </button>
            )}
          </div>
  
          {/* Filters Section */}
          <div className="bg-dark-primary/30 rounded-xl p-4 shadow-md border border-slate-gray/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-3 
                  bg-dark-primary/50 text-light-blue 
                  rounded-lg border border-slate-gray/30 
                  focus:outline-none focus:ring-2 focus:ring-light-blue/50 
                  transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
  
              {/* Status Filter */}
              <select
                className="w-full py-3 
                bg-dark-primary/50 text-light-blue 
                rounded-lg border border-slate-gray/30 
                focus:outline-none focus:ring-2 focus:ring-light-blue/50 
                transition-all duration-300"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Planned">Planned</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>
  
          {/* Projects Table */}
          <div className="bg-dark-primary/30 rounded-xl overflow-hidden shadow-md border border-slate-gray/20">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-primary/50 border-b border-slate-gray/30">
                  <tr>
                    <th className="p-4 text-left text-light-blue/70 font-semibold">Project</th>
                    <th className="p-4 text-left text-light-blue/70 font-semibold">Status</th>
                    <th className="p-4 text-left text-light-blue/70 font-semibold">Client</th>
                    <th className="p-4 text-left text-light-blue/70 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProjects.map((project) => (
                    <tr
                      key={project.id}
                      onClick={() => navigate(`/project/${project.id}/view`)}
                      className="border-b border-slate-gray/20 
                      hover:bg-dark-primary/40 transition-colors duration-200"
                    >
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 mr-4">
                            <div className="h-10 w-10 rounded-full bg-light-blue/20 flex items-center justify-center">
                              <FaProjectDiagram className="text-light-blue" />
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-light-blue">
                              {project.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {project.startDate} - {project.endDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        {renderProjectStatusBadge(project.status)}
                      </td>
                      <td className="p-4 text-sm text-light-blue/80">
                        {project.client}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-3">
                            <button
                            onClick={() => navigate(`/project/${project.id}/view`)}
                            className="text-light-blue hover:text-white transition-colors group rounded-lg p-2"
                            aria-label="View Project"
                            >
                            <FaEye className="group-hover:scale-110 transition-transform" />
                            </button>
                            
                            {isAdminAuthenticated && (
                            <>
                                <button
                                onClick={() => navigate(`/project/${project.id}/edit`)}
                                className="text-yellow-200 hover:text-white transition-colors group rounded-lg p-2"
                                aria-label="Edit Project"
                                >
                                <FaEdit className="group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-red-400 hover:text-white transition-colors group rounded-lg p-2"
                                aria-label="Delete Project"
                                >
                                <FaTrash className="group-hover:scale-110 transition-transform" />
                                </button>
                            </>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
  
            {/* Pagination Controls */}
            <div className="py-4 flex justify-between items-center">
              <div className="text-sm text-light-blue/70">
                Showing {Math.min((currentPage - 1) * pageSize + 1, filteredProjects.length)} to {Math.min(currentPage * pageSize, filteredProjects.length)} of {filteredProjects.length} projects
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                  className="text-light-blue hover:text-white transition-colors px-4 py-2 rounded-lg"
                >
                  Prev
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  className="text-light-blue hover:text-white transition-colors px-4 py-2 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

const LoadingIndicator = () => (
  <div className="min-h-screen flex justify-center items-center bg-dark-background">
    <div className="flex items-center text-light-blue">
      <FaSpinner className="animate-spin mr-3 text-4xl" />
      <span className="text-xl">Loading Projects...</span>
    </div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="min-h-screen flex justify-center items-center bg-dark-background">
    <div className="flex items-center text-red-500">
      <FaExclamationCircle className=" mr-3 text-4xl" />
      <span className="text-xl">{message}</span>
    </div>
  </div>
);

export default ManageProjects;