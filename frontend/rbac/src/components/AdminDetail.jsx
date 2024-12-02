
import React, { useState, useEffect } from 'react';
import { 
  FaUserShield, 
  FaEnvelope, 
  FaIdBadge, 
  FaCalendarAlt, 
  FaLock, 
  FaUserCog,
  FaEdit,
  FaKey,
  FaProjectDiagram,
  FaCheckCircle,
  FaExclamationCircle,
  FaUser
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const AdminDetailService = {
  fetchAdminDetails: async (adminId) => {
    // Simulated API call
    return {
      id: adminId,
      name: `Admin ${adminId}`,
      email: `admin${adminId}@vrvsecurity.com`,
      role: 'Security Administrator',
      profileImage: `https://i.pravatar.cc/150?u=admin${adminId}`,
      status: 'Active',
      lastLogin: new Date().toLocaleDateString(),
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
      permissions: [
        'User Management',
        'Access Control',
        'System Configuration',
        'Audit Logs'
      ],
      departments: ['Security', 'IT Infrastructure'],
      contactNumber: '+1 (555) 123-4567',
      accessLevel: 'High',
      securityClearance: 'Top Secret',
      projects: [
        {
          id: 1,
          name: 'Cybersecurity Upgrade',
          status: 'In Progress',
          startDate: '2023-01-15',
          endDate: '2023-12-31',
          description: 'Comprehensive security system overhaul',
          progress: 65
        },
        {
          id: 2,
          name: 'Network Resilience Project',
          status: 'Completed',
          startDate: '2022-06-01',
          endDate: '2023-05-30',
          description: 'Enhancing network infrastructure and security protocols',
          progress: 100
        },
        {
          id: 3,
          name: 'Cloud Security Migration',
          status: 'Planned',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          description: 'Migrating on-premise systems to secure cloud infrastructure',
          progress: 20
        }
      ]
    };
  }
};

const AdminDetail = () => {
  const { adminId } = useParams();
  const navigate = useNavigate();
  
  const [adminDetails, setAdminDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        setLoading(true);
        const details = await AdminDetailService.fetchAdminDetails(adminId);
        setAdminDetails(details);
      } catch (err) {
        setError('Failed to load admin details');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, [adminId]);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorDisplay message={error} />;
  if (!adminDetails) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-background via-dark-primary to-dark-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl"
      >
        <div className="bg-dark-primary/90 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-light-blue/20 to-dark-primary/30 p-6 border-b border-slate-gray/30">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-light-blue flex items-center">
                <FaUserShield className="mr-2" />
                Admin Profile
              </h1>
              <div className="flex space-x-4">
                <button 
                  onClick={() => navigate(`/admins/${adminId}/edit`)}
                  className="bg-light-blue text-dark-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  <FaEdit className="inline mr-2" /> Edit Profile
                </button>
                <button 
                  onClick={() => navigate(`/admins/${adminId}/reset-password`)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  <FaKey className="inline mr-2" /> Reset Password
                </button>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Image and Basic Info */}
            <div className="md:col-span-1 flex flex-col items-center">
              <img 
                src={adminDetails.profileImage} 
                alt={`${adminDetails.name}'s profile`} 
                className="w-40 h-40 rounded-full border-4 border-light-blue mb-4"
              />
              <h2 className="text-xl font-bold text-light-blue">{adminDetails.name}</h2>
              <p className="text-gray-400">{adminDetails.role}</p>
              <div className="mt-4 flex items-center">
                <span className={`
                  px-3 py-1 rounded-full text-sm font-bold 
                  ${adminDetails.status === 'Active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                  }
                `}>
                  {adminDetails.status}
                </span>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem 
                icon={<FaEnvelope className="text-light-blue" />} 
                label="Email" 
                value={adminDetails.email} 
              />
              <DetailItem 
                icon={<FaIdBadge className="text-light-blue" />} 
                label="Contact Number" 
                value={adminDetails.contactNumber} 
              />
              <DetailItem 
                icon={<FaCalendarAlt className="text-light-blue" />} 
                label="Join Date" 
                value={adminDetails.joinDate} 
              />
              <DetailItem 
                icon={<FaUserCog className="text-light-blue" />} 
                label="Access Level" 
                value={adminDetails.accessLevel} 
              />
              <DetailItem 
                icon={<FaLock className="text-light-blue" />} 
                label="Security Clearance" 
                value={adminDetails.securityClearance} 
              />
            </div>
          </div>

          {/* Permissions and Departments */}
          <div className="p-6 bg-dark-primary/60 border-t border-slate-gray/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Permissions */}
              <div>
                <h3 className="text-lg font-semibold text-light-blue mb-4">
                  Permissions
                </h3>
                <ul className="space-y-2">
                  {adminDetails.permissions.map((permission, index) => (
                    <li 
                      key={index} 
                      className="bg-dark-primary/40 px-4 py-2 rounded-lg text-gray-300"
                    >
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Departments */}
              <div>
                <h3 className="text-lg font-semibold text-light-blue mb-4">
                  Departments
                </h3>
                <ul className="space-y-2">
                  {adminDetails.departments.map((department, index) => (
                    <li 
                      key={index} 
                      className="bg-dark-primary/40 px-4 py-2 rounded-lg text-gray-300"
                    >
                      {department}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Projects Section */}
          <div className="p-6 bg-dark-primary/60 border-t border-slate-gray/30">
            <div className="flex items-center mb-6">
              <FaProjectDiagram className="text-light-blue mr-3 text-2xl" />
              <h3 className="text-xl font-semibold text-light-blue">
                Current Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {adminDetails.projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-dark-primary/40 rounded-xl p-5 border border-slate-gray/30"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-light-blue">
                      {project.name}
                    </h4>
                    <span 
                      className={`
                        px-3 py-1 rounded-full text-xs font-bold
                        ${
                          project.status === 'Completed' 
                            ? 'bg-green-500/20 text-green-400'
                            : project.status === 'In Progress'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }
                      `}
                    >
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Project Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-dark-primary/50 rounded-full h-2.5">
                      <div 
                        className="bg-light-blue h-2.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-400">
                    <div>
                      <FaCalendarAlt className="inline mr-2" />
                      {project.startDate}
                    </div>
                    <div>
                      <FaCalendarAlt className="inline mr-2" />
                      {project.endDate}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Detail Item Component
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    <div className="text-2xl text-light-blue">{icon}</div>
    <div>
      <h4 className="text-sm font-semibold text-gray-400">{label}</h4>
      <p className="text-light-blue">{value}</p>
    </div>
  </div>
);

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

export default AdminDetail;