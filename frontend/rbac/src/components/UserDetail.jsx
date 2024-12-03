import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaIdBadge, 
  FaCalendar, 
  FaProjectDiagram, 
  FaUserShield,
  FaEdit,
  FaArrowLeft,
  FaTasks  
} from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock user data generation (replace with actual API call)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Simulate API call
        const mockUser = {
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`,
          profileImage: `https://i.pravatar.cc/150?u=${userId}`,
          role: 'Security Analyst',
          department: 'Cybersecurity',
          joinDate: '2023-01-15',
          status: 'Active',
          projects: [
            {
              id: 1,
              name: 'Network Security Audit',
              startDate: '2023-06-01',
              endDate: '2023-08-30',
              status: 'Completed'
            },
            {
              id: 2,
              name: 'Cloud Infrastructure Protection',
              startDate: '2023-09-01',
              status: 'In Progress'
            }
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
            {
              id: 2,
              projectName: 'Cloud Infrastructure Protection',
              taskName: 'Firewall Configuration',
              status: 'In Progress',
              priority: 'Medium',
              dueDate: '2023-09-15',
              projectId: 2
            },
            {
              id: 3,
              projectName: 'Compliance Framework',
              taskName: 'Security Policy Review',
              status: 'Pending',
              priority: 'Low',
              dueDate: '2023-10-30',
              projectId: 3
            }
          ],
          permissions: [
            'View Security Logs',
            'Manage User Access',
            'Conduct Vulnerability Assessments'
          ],
          contact: {
            phone: '+1 (555) 123-4567',
            address: '123 Cybersecurity Lane, Tech City, CA 90210'
          }

        };

        setUser(mockUser);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-background">
        <div className="text-light-blue text-2xl flex items-center">
          <svg className="animate-spin h-8 w-8 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading User Details...
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
      <div className="container mx-auto max-w-5xl">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/user/users')}
          className="flex items-center text-light-blue hover:text-white mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Users
        </button>

        <div className="bg-dark-primary/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-slate-gray/30">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center mb-8 space-y-6 md:space-y-0">
            <div className="relative mr-0 md:mr-8 mb-4 md:mb-0">
              <img 
                src={user.profileImage} 
                alt={user.name} 
                className="w-32 h-32 rounded-full object-cover border-4 border-light-blue/50 shadow-lg"
              />
              <span 
                className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white
                  ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}
              ></span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-light-blue mb-2">{user.name}</h1>
              <div className="flex items-center justify-center md:justify-start space-x-3 text-gray-300">
                <FaUserShield className="text-light-blue" />
                <span>{user.role}</span>
                <span className="mx-2">•</span>
                <FaEnvelope className="text-light-blue" />
                <span>{user.email}</span>
              </div>
            </div>
            <div className="ml-auto">
              <button 
                onClick={() => navigate(`/users/${userId}/edit`)}
                className="flex items-center space-x-2 
                bg-light-blue text-dark-primary 
                px-4 py-2 rounded-lg 
                hover:bg-opacity-90 
                transition-all duration-300"
              >
                <FaEdit />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-dark-primary/50 rounded-lg p-6 border border-slate-gray/30">
              <h2 className="text-xl font-semibold text-light-blue mb-4 flex items-center">
                <FaIdBadge className="mr-3 text-light-blue/70" />
                Personal Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Department</span>
                  <span className="text-light-blue">{user.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Join Date</span>
                  <span className="text-light-blue">{user.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contact</span>
                  <span className="text-light-blue">{user.contact.phone}</span>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-dark-primary/50 rounded-lg p-6 border border-slate-gray/30">
              <h2 className="text-xl font-semibold text-light-blue mb-4 flex items-center">
                <FaUserShield className="mr-3 text-light-blue/70" />
                Permissions </h2>
              <ul className="list-disc list-inside space-y-2">
                {user.permissions.map((permission, index) => (
                  <li key={index} className="text-light-blue">{permission}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Projects Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-light-blue mb-4 flex items-center">
              <FaProjectDiagram className="mr-3 text-light-blue/70" />
              Projects
            </h2>
            <div className="space-y-4">
              {user.projects.map((project) => (
                <div key={project.id} className="bg-dark-primary/50 rounded-lg p-4 border border-slate-gray/30">
                  <h3 className="text-lg font-bold text-light-blue">{project.name}</h3>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Start Date:</span>
                    <span className="text-light-blue">{project.startDate}</span>
                  </div>
                  {project.endDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">End Date:</span>
                      <span className="text-light-blue">{project.endDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`text-light-blue ${project.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-light-blue mb-4 flex items-center">
              <FaTasks className="mr-3 text-light-blue/70" />
              Assigned Tasks
            </h2>
            <div className="space-y-4">
              {user.projectTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="bg-dark-primary/50 rounded-lg p-4 border border-slate-gray/30 
                  hover:border-light-blue/50 transition-all 
                  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold text-light-blue">
                      {task.taskName}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Project: {task.projectName}
                    </p>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400">Due Date</span>
                    <span className="text-light-blue">{task.dueDate}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span 
                      className={`
                        px-3 py-1 rounded-full text-xs font-bold
                        ${
                          task.status === 'Completed' 
                            ? 'bg-green-500/20 text-green-400'
                            : task.status === 'In Progress'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }
                      `}
                    >
                      {task.status}
                    </span>
                    
                    <span 
                      className={`
                        px-3 py-1 rounded-full text-xs font-bold
                        ${
                          task.priority === 'High' 
                            ? 'bg-red-500/20 text-red-400'
                            : task.priority === 'Medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        }
                      `}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;