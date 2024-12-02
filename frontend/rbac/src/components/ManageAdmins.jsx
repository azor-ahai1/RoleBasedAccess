import React, { 
    useState, 
    useEffect, 
    useMemo, 
    useCallback 
  } from 'react';
  import PropTypes from 'prop-types';
  import { 
    FaUserShield, 
    FaSearch, 
    FaEdit, 
    FaTrash, 
    FaUser,
    FaPlus,
    FaExclamationCircle,
    FaFilter,
    FaBars,
    FaTimes
  } from 'react-icons/fa';
  import { motion, AnimatePresence } from 'framer-motion';
  import { useNavigate } from 'react-router-dom';
  
  // Admin Service
  const AdminService = {
    fetchAdmins: async () => {
      const adminRoles = [
        'Super Admin',
        'Security Administrator',
        'Compliance Manager',
        'Network Security Admin',
        'System Administrator'
      ];
  
      return Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: `Admin ${index + 1}`,
        email: `admin${index + 1}@vrvsecurity.com`,
        role: adminRoles[Math.floor(Math.random() * adminRoles.length)],
        profileImage: `https://i.pravatar.cc/150?u=admin${index + 1}`,
        status: index % 4 === 0 ? 'Inactive' : 'Active',
        lastLogin: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
        permissions: [
          'User Management',
          'Access Control',
          'System Configuration',
          'Audit Logs'
        ]
      }));
    },
  
    deleteAdmin: async (adminId) => {
      // Simulate delete API call
      return new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
      });
    }
  };
  
  const ManageAdmins = ({ 
    initialPageSize = 10, 
    onAdminSelect 
  }) => {
    const navigate = useNavigate();
    
    // State Management
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Filtering States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(initialPageSize);
  
    // Responsive States
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
    // Admin Roles
    const adminRoles = [
      'Super Admin',
      'Security Administrator',
      'Compliance Manager',
      'Network Security Admin',
      'System Administrator'
    ];
  
    // Fetch Admins
    const fetchAdmins = useCallback(async () => {
      try {
        setLoading(true);
        const data = await AdminService.fetchAdmins();
        setAdmins(data);
      } catch (err) {
        setError('Failed to load administrators');
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchAdmins();
    }, [fetchAdmins]);
  
    // Responsive Handling
    useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    // Filtering Logic
    const filteredAdmins = useMemo(() => {
      return admins.filter(admin => 
        (searchTerm === '' || 
          admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admin.email.toLowerCase().includes(searchTerm.toLowerCase())
        ) &&
        (selectedRole === '' || admin.role === selectedRole)
      );
    }, [admins, searchTerm, selectedRole]);
  
    // Pagination Logic
    const paginatedAdmins = useMemo(() => {
      const startIndex = (currentPage - 1) * pageSize;
      return filteredAdmins.slice(startIndex, startIndex + pageSize);
    }, [filteredAdmins, currentPage, pageSize]);
  
    // Admin Action Handlers
    const handleAdminAction = useCallback((action, admin) => {
      switch(action) {
        case 'view':
          navigate(`/admins/${admin.id}/view`, { state: { admin } });
          break;
        case 'edit':
          navigate(`/admins/${admin.id}/edit`, { state: { admin } });
          break;
        case 'delete':
          handleDeleteAdmin(admin.id);
          break;
        default:
          break;
      }
    }, [navigate]);
  
    // Delete Admin Handler
    const handleDeleteAdmin = async (adminId) => {
      try {
        await AdminService.deleteAdmin(adminId);
        setAdmins(admins.filter(admin => admin.id !== adminId));
      } catch (err) {
        setError('Failed to delete administrator');
      }
    };
  
    // Render Loading
    if (loading) return <LoadingIndicator />;
  
    // Render Error
    if (error) return <ErrorDisplay message={error} />;
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-background via-dark-primary to-dark-background p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto max-w-7xl"
        >
          <div className="bg-dark-primary/90 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-light-blue/20 to-dark-primary/30 p-6 border-b border-slate-gray/30">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-light-blue flex items-center">
                  <FaUserShield className="mr-2" />
                  Admin Management
                </h1>
                <button 
                  onClick={() => navigate('/admins/create')}
                  className="bg-light-blue text-dark-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  <FaPlus className="inline mr-2" /> Add New Admin
                </button>
              </div>
            </div>
  
            {/* Filters */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Search Input */}
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search admins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-dark-primary/60 border-2 border-slate-gray/50 rounded-xl text-light-blue"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
  
                {/* Role Filter */}
                <div className="relative">
                  <select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-dark-primary/60 border-2 border-slate-gray/50 rounded-xl text-light-blue"
                  >
                    <option value="">All Roles</option>
                    {adminRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
  
            {/* Admin Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-gray">
                <thead className="bg-dark-primary/80">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-blue uppercase tracking-wider">Profile</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-blue uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-blue uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-blue uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-blue uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-blue uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-dark-primary">
                  {paginatedAdmins.map(admin => (
                    <tr key={admin.id} className="hover:bg-dark-primary/70" onClick={() => handleAdminAction('view', admin)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-light-blue">
                        <img src={admin.profileImage} alt={`${admin.name}'s profile`} className="w-10 h-10 rounded-full" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-light-blue">{admin.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-light-blue">{admin.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-light-blue">{admin.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-light-blue">{admin.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => handleAdminAction('view', admin)} className="text-light-blue hover:text-blue-500">View</button>
                        <button onClick={() => handleAdminAction('edit', admin)} className="text-light-blue hover:text-blue-500 ml-4">Edit</button>
                        <button onClick={() => handleAdminAction('delete', admin)} className="text-red-500 hover:text-red-700 ml-4">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
  
            {/* Pagination */}
            <div className="flex justify-between items-center p-4">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-light-blue text-dark-primary px-4 py-2 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-light-blue">Page {currentPage} of {Math.ceil(filteredAdmins.length / pageSize)}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredAdmins.length / pageSize)))}
                disabled={currentPage === Math.ceil(filteredAdmins.length / pageSize)}
                className="bg-light-blue text-dark-primary px-4 py-2 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };
  
  // Prop Type Validation
  ManageAdmins.propTypes = {
    initialPageSize: PropTypes.number,
    onAdminSelect: PropTypes.func
  };
  
  export default ManageAdmins;
  
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