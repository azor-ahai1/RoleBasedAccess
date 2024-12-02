import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaIdBadge, 
  FaCalendar, 
  FaProjectDiagram, 
  FaUserShield,
  FaSave,
  FaArrowLeft,
  FaTasks, 
  FaTimes 
} from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAdminAuth, selectUser } from '../store/authSlice';
import { motion } from 'framer-motion';

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const isAdminAuthenticated = useSelector(selectAdminAuth);
  const currentUser = useSelector(selectUser);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
    contact: {
      phone: '',
      address: ''
    },
    permissions: [],
    projectTasks: [],
    projects: []
  });

  

  // Check user authorization
  useEffect(() => {
    // Only allow edit if current user is admin or the user themselves
    const isAuthorized = 
      isAdminAuthenticated || 
      (currentUser && currentUser.id === parseInt(userId));

    if (!isAuthorized) {
      navigate('/unauthorized');
      return;
    }
  }, [userId, isAdminAuthenticated, currentUser, navigate]);

  // Fetch User Details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Simulate API call or use mock data similar to UserDetail
        const mockUser = {
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`,
          role: 'Security Analyst',
          department: 'Cybersecurity',
          contact: {
            phone: '+1 (555) 123-4567',
            address: '123 Cybersecurity Lane, Tech City, CA 90210'
          },
          permissions: [
            'View Security Logs',
            'Manage User Access',
            'Conduct Vulnerability Assessments'
          ],
          projectTasks: [
            {
              id: 1,
              projectName: 'Network Security Audit',
              taskName: 'Vulnerability Assessment',
              status: 'Completed',
              priority: 'High',
              dueDate: '2023-06-30',
              projectId: 1
            },
          ],
          projects: [
            {
              id: 1,
              name: 'Network Security Audit',
              startDate: '2023-01-15',
              endDate: '2023-06-30',
              status: 'Completed'
            },
          ],
        };

        setUser(mockUser);
        setFormData({
          name: mockUser.name,
          email: mockUser.email,
          department: mockUser.department,
          role: mockUser.role,
          contact: mockUser.contact,
          permissions: mockUser.permissions,
          projectTasks: mockUser.projectTasks || [],
          projects: mockUser.projects || []
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested contact fields
    if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePermissionToggle = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...formData.projectTasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      projectTasks: updatedTasks
    }));
  };
  
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      projects: updatedProjects
    }));
  };
  
  const addNewTask = () => {
    setFormData(prev => ({
      ...prev,
      projectTasks: [
        ...prev.projectTasks,
        {
          id: Date.now(),
          projectName: '',
          taskName: '',
          status: 'Pending',
          priority: 'Low',
          dueDate: '',
          projectId: null
        }
      ]
    }));
  };
  
  const removeTask = (index) => {
    setFormData(prev => ({
      ...prev,
      projectTasks: prev.projectTasks.filter((_, i) => i !== index)
    }));
  };
  
  const addNewProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now(),
          name: '',
          startDate: '',
          endDate: '',
          status: 'Planned'
        }
      ]
    }));
  };
  
  const removeProject = (index) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Implement actual API call to update user
      console.log('Updated User Data:', formData);
      navigate(`/users/${userId}/view`);
    } catch (err) {
      setError('Failed to update user details');
    }
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-background via-dark-primary to-dark-background p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl"
      >
        <div className="bg-dark-primary/90 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-light-blue/20 to-dark-primary/30 p-6 border-b border-slate-gray/30 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(`/users/${userId}/view`)}
                className="text-light-blue hover:text-white"
              >
                <FaArrowLeft className="text-2xl" />
              </button>
              <h1 className="text-2xl font-bold text-light-blue flex items-center">
                <FaUserShield className="mr-2" />
                Edit User Profile
              </h1>
            </div>
            <button 
              onClick={handleSubmit}
              className="bg-light-blue text-dark-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center"
            >
              <FaSave className="mr-2" />
              Save Changes
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-light-blue mb-2">Full Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                />
              </div>
              <div>
                <label className="block text-light-blue mb-2">Email</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                />
              </div>
            </div>

            {/* Professional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-light-blue mb-2">Department</label>
                <input 
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                />
              </div>
              <div>
                <label className="block text-light-blue mb-2">Role</label>
                <input 
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:gri d-cols-2 gap-6">
              <div>
                <label className="block text-light-blue mb-2">Phone</label>
                <input 
                  type="text"
                  name="contact.phone"
                  value={formData.contact.phone}
                  onChange={handleInputChange}
                  className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                />
              </div>
              <div>
                <label className="block text-light-blue mb-2">Address</label>
                <input 
                  type="text"
                  name="contact.address"
                  value={formData.contact.address}
                  onChange={handleInputChange}
                  className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                />
              </div>
            </div>

            {/* Permissions */}
            <div>
              <h2 className="text-xl font-semibold text-light-blue mb-4 flex items-center">
                <FaTasks className="mr-3 text-light-blue/70" />
                Permissions
              </h2>
              <div className="space-y-2">
                {['View Security Logs', 'Manage User Access', 'Conduct Vulnerability Assessments'].map(permission => (
                  <div key={permission} className="flex items-center">
                    <input 
                      type="checkbox"
                      checked={formData.permissions.includes(permission)}
                      onChange={() => handlePermissionToggle(permission)}
                      className="mr-2"
                    />
                    <label className="text-light-blue">{permission}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Tasks Section */}
            <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-light-blue flex items-center">
                <FaTasks className="mr-3 text-light-blue/70" />
                Assigned Tasks
                </h2>
                <button
                type="button"
                onClick={addNewTask}
                className="bg-light-blue text-dark-primary px-3 py-1 rounded-lg text-sm"
                >
                Add Task
                </button>
            </div>
            <div className="space-y-4">
                {(formData.projectTasks || []).map((task, index) => (
                <div 
                    key={task.id} 
                    className="bg-dark-primary/50 rounded-lg p-4 border border-slate-gray/30 
                    grid grid-cols-1 md:grid-cols-3 gap-4 items-center relative"
                >
                    <button
                    type="button"
                    onClick={() => removeTask(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                    <FaTimes />
                    </button>
                    <div>
                    <label className="block text-light-blue mb-2">Task Name</label>
                    <input
                        type="text"
                        value={task.taskName}
                        onChange={(e) => handleTaskChange(index, 'taskName', e.target.value)}
                        className="w-full bg-dark-primary/30 border border-slate-gray/30 rounded-lg p-2 text-light-blue"
                    />
                    </div>
                    <div>
                    <label className="block text-light-blue mb-2">Project</label>
                    <input
                        type="text"
                        value={task.projectName}
                        onChange={(e) => handleTaskChange(index, 'projectName', e.target.value)}
                        className="w-full bg-dark-primary/30 border border-slate-gray/30 rounded-lg p-2 text-light-blue"
                    />
                    </div>
                    <div>
                    <label className="block text-light-blue mb-2">Due Date</label>
                    <input
                        type="date"
                        value={task.dueDate}
                        onChange={(e) => handleTaskChange(index, 'dueDate', e.target.value)}
                        className="w-full bg-dark-primary/30 border border-slate-gray/30 rounded-lg p-2 text-light-blue"
                    />
                    </div>
                    <div>
                    <label className="block text-light-blue mb-2">Status</label>
                    <select
                        value={task.status}
                        onChange={(e) => handleTaskChange(index, 'status', e.target.value)}
                        className="w-full bg-dark-primary/30 border border-slate-gray/30 rounded-lg p-2 text-light-blue"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    </div>
                    <div>
                    <label className="block text-light-blue mb-2">Priority</label>
                    <select
                        value={task.priority}
                        onChange={(e) => handleTaskChange(index, 'priority', e.target.value)}
                        className="w-full bg-dark-primary/30 border border-slate-gray/30 rounded-lg p-2 text-light-blue"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    </div>
                </div>
                ))}
            </div>
            </div>

            {/* Projects Section */}
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-light-blue flex items-center">
                    <FaProjectDiagram className="mr-3 text-light-blue/70" />
                    Projects
                    </h2>
                    <button
                    type="button"
                    onClick={addNewProject}
                    className="bg-light-blue text-dark-primary px-3 py-1 rounded-lg text-sm"
                    >
                    Add Project
                    </button>
                </div>
                <div className="space-y-4">
                    {(formData.projects || []).map((project, index) => (
                    <div 
                        key={project.id} 
                        className="bg-dark-primary/50 rounded-lg p-4 border border-slate-gray/30 
                        grid grid-cols-1 md:grid-cols-3 gap-4 items-center relative"
                    >
                        <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                        <FaTimes />
                        </button>
                        <div>
                        <label className="block text-light-blue mb-2">Project Name</label>
                        <input
                        type="text"
                        value={project.name}
                        onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                        className="w-full bg-dark-primary/30 border border-slate-gray/30 rounded-lg p-2 text-light-blue"
                        />
                        </div>
                        <div>
                        <label className="block text-light-blue mb-2">Start Date</label>
                        <input
                            type="date"
                            value={project.startDate}
                            onChange={(e) => handleProjectChange(index, 'startDate', e.target.value)}
                            className="w-full bg-dark-primary/30 border border-slate-gray/30 rounded-lg p-2 text-light-blue"
                        />
                        </div>
                        <div>
                        <label className="block text-light-blue mb-2">End Date</label>
                        <input
                            type="date"
                            value={project.endDate}
                            onChange={(e) => handleProjectChange(index, 'endDate', e.target.value)}
                            className="w-full bg-dark-primary/30 border border-slate-gray/30 rounded-lg p-2 text-light-blue"
                        />
                        </div>
                        <div>
                        <label className="block text-light-blue mb-2">Status</label>
                        <select
                            value={project.status}
                            onChange={(e) => handleProjectChange(index, 'status', e.target.value)}
                            className="w-full bg-dark-primary/30 border border-slate-gray/30 rounded-lg p-2 text-light-blue"
                        >
                            <option value="Planned">Planned</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

  // Utility Components
  const LoadingIndicator = () => (
    <div className="flex justify-center items-center h-screen">
      <FaUser Shield className="animate-spin text-4xl" />
    </div>
  );
  
  const ErrorDisplay = ({ message }) => (
    <div className="flex justify-center items-center h-screen text-red-500">
      <FaExclamationCircle className="mr-2" />
      {message}
    </div>
  );

export default EditUser ;