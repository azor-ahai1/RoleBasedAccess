import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaIdBadge, 
  FaUserShield,
  FaSave,
  FaTimes,
  FaLock,
  FaKey,
  FaProjectDiagram,
  FaTasks,
  FaPlus, FaTrash, FaEdit,
  FaArrowLeft,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectAdminAuth } from '../store/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const AdminService = {
  fetchAdminDetails: async (adminId) => {
    // Simulated API call to fetch admin details
    return {
      id: adminId,
      name: `Admin ${adminId}`,
      email: `admin${adminId}@vrvsecurity.com`,
      role: 'Security Administrator',
      department: 'Cybersecurity',
      contact: {
        phone: '+1 (555) 123-4567',
        address: '123 Security Lane, Tech City, CA 90210'
      },
      permissions: [
        'User Management',
        'Access Control',
        'System Configuration',
        'Audit Logs'
      ],
      projects: [
        {
          id: 1,
          name: 'Cybersecurity Upgrade',
          startDate: '2023-01-15',
          endDate: '2023-12-31',
          status: 'In Progress'
        }
      ]
    };
  },

  updateAdminProfile: async (adminId, data) => {
    // Simulated API call to update admin profile
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...data,
          id: adminId
        });
      }, 1000);
    });
  },

  fetchPossibleRoles: () => [
    'Super Admin',
    'Security Administrator',
    'Compliance Manager',
    'Network Security Admin',
    'System Administrator'
  ],

  fetchPossiblePermissions: () => [
    'User Management',
    'Access Control',
    'System Configuration',
    'Audit Logs',
    'Security Monitoring',
    'Incident Response'
  ]
};

const EditAdmin = () => {
  const navigate = useNavigate();
  const { adminId } = useParams();
  const isAdminAuthenticated = useSelector(selectAdminAuth);
  const currentAdmin = useSelector(state => state.auth.user);

  const [adminDetails, setAdminDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roles] = useState(AdminService.fetchPossibleRoles());
  const [permissions] = useState(AdminService.fetchPossiblePermissions());
  const [editableProjects, setEditableProjects] = useState([]);

  // Authorization Check
  useEffect(() => {
    // Ensure only the logged-in admin can edit their own profile
    // if (!isAdminAuthenticated || currentAdmin.id !== parseInt(adminId)) {
    //   navigate('/unauthorized');
    //   return;
    // }

    // Fetch admin details
    const fetchDetails = async () => {
      try {
        const details = await AdminService.fetchAdminDetails(adminId);
        setAdminDetails(details);
        setEditableProjects(details.projects || []);
        reset(details); // Reset form with fetched details
      } catch (error) {
        console.error('Failed to fetch admin details', error);
        navigate('/admin/dashboard');
      }
    };

    fetchDetails();
  }, [adminId, isAdminAuthenticated, currentAdmin, navigate]);

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors },
    watch 
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const updatedData = {
        ...data,
        projects: editableProjects || []
      };
      const updatedAdmin = await AdminService.updateAdminProfile(adminId, data);
      navigate(`/admins/${adminId}/view`);
    } catch (error) {
      console.error('Admin profile update failed', error);
      setIsSubmitting(false);
    }
  };

  // Password change state and handler
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const handlePasswordChangeToggle = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  // If details are not loaded
  if (!adminDetails) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-dark-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-light-blue"></div>
      </div>
    );
  }

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(), // Temporary ID
      name: '',
      startDate: '',
      endDate: '',
      status: 'Planned',
      isNew: true // Flag to distinguish new projects
    };
    setEditableProjects([...editableProjects, newProject]);
  };

  const handleEditProject = (projectId, updatedProject) => {
    setEditableProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId ? { ...project, ...updatedProject } : project
      )
    );
  };

  const handleDeleteProject = (projectId) => {
    setEditableProjects(prevProjects => 
      prevProjects.filter(project => project.id !== projectId)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-background via-dark-primary to-dark-background p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl"
      >
        <div className="bg-dark-primary/90 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-light-blue/20 to-dark-primary/30 p-4 md:p-6 border-b border-slate-gray/30">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-2 md:space-x-4 w-full md:w-auto">
                      <button 
                          onClick={() => navigate(`/admins/${adminId}/view`)}
                          className="text-light-blue hover:text-white"
                          aria-label="Go back to admin profile"
                      >
                          <FaArrowLeft className="text-xl md:text-2xl" />
                      </button>
                      <h1 className="text-xl md:text-2xl font-bold text-light-blue flex items-center">
                          <FaUserShield className="mr-2 text-lg md:text-xl" />
                          <span className="hidden md:inline">Edit Admin Profile</span>
                          <span className="md:hidden">Edit Profile</span>
                      </h1>
                  </div>
                  <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto'>
                      <button
                          type="button"
                          onClick={() => navigate(`/admins/${adminId}/view`)}
                          className="
                          w-full md:w-auto
                          bg-red-500/20 text-red-400 
                          px-4 py-2 rounded-lg 
                          hover:bg-red-500/30 
                          transition-all 
                          flex items-center 
                          justify-center
                          hover:scale-105 
                          active:scale-95
                          "
                      >
                          <FaTimes className="mr-2" /> 
                          <span className="hidden md:inline">Cancel</span>
                          <span className="md:hidden">Close</span>
                      </button>
                      <button 
                          onClick={handleSubmit(onSubmit)}
                          disabled={isSubmitting}
                          className="
                          w-full md:w-auto
                          bg-light-blue text-dark-primary 
                          px-4 py-2 rounded-lg 
                          hover:bg-opacity-90 
                          transition-all 
                          flex items-center 
                          justify-center
                          hover:scale-105 
                          active:scale-95
                          "
                      >
                          <FaSave className="mr-2" />
                          <span className="hidden md:inline">Save Changes</span>
                          <span className="md:hidden">Save</span>
                      </button>
                  </div>
              </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-light-blue mb-2">Full Name</label>
                <input 
                  type="text"
                  {...register('name', { 
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters' }
                  })}
                  defaultValue={adminDetails.name}
                  className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-light-blue mb-2">Email</label>
                <input 
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/, message: 'Invalid email address'
                    }
                  })}
                  defaultValue={adminDetails.email}
                  className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Role and Permissions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-light-blue mb-2">Role</label>
                <select 
                  {...register('role', { required: 'Role is required' })}
                  defaultValue={adminDetails.role}
                  className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-light-blue mb-2">Permissions</label>
                <select 
                  {...register('permissions', { required: 'At least one permission is required' })}
                  multiple
                  className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                >
                  {permissions.map((permission) => (
                    <option key={permission} value={permission}>{permission}</option>
                  ))}
                </select>
                {errors.permissions && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.permissions.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-light-blue mb-2">Phone</label>
                <input 
                  type="text"
                  {...register('contact.phone', { required: 'Phone number is required' })}
                  defaultValue={adminDetails.contact.phone}
                  className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                  placeholder="Enter phone number"
                />
                {errors.contact?.phone && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.contact.phone.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-light-blue mb-2">Address</label>
                <input 
                  type="text"
                  {...register('contact.address', { required: 'Address is required' })}
                  defaultValue={adminDetails.contact.address}
                  className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                  placeholder="Enter address"
                />
                {errors.contact?.address && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.contact.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password Change Section */}
            {/* <div className="mt-8">
              <h2 className="text-lg font-bold text-light-blue mb-4">Change Password</h2>
              <button 
                type="button" 
                onClick={handlePasswordChangeToggle} 
                className="text-light-blue underline"
              >
                {showPasswordFields ? 'Hide Password Fields' : 'Change Password'}
              </button>
              {showPasswordFields && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-light-blue mb-2">New Password</label>
                    <input 
                      type="password"
                      {...register('newPassword', { 
                        required: 'New password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                      className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                      placeholder="Enter new password"
                    />
                    {errors.newPassword && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-light-blue mb-2">Confirm Password</label>
                    <input 
                      type="password"
                      {...register('confirmPassword', { 
                        required: 'Please confirm your password',
                        validate: (value) => {
                          const { newPassword } = watch();
                          return newPassword === value || 'Passwords do not match';
                        }
                      })}
                      className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                      placeholder="Confirm new password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div> */}

            {/* Projects Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-light-blue flex items-center">
                  <FaProjectDiagram className="mr-2" />
                  Projects
                </h2>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="bg-light-blue text-dark-primary px-3 py-1 rounded-lg text-sm flex items-center"
                >
                  <FaPlus className="mr-2" /> Add Project
                </button>
              </div>
              
              {editableProjects.length > 0 ? (editableProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 bg-dark-primary/40 p-4 rounded-lg relative"
                >
                  {/* Delete Project Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(project.id)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-500"
                    aria-label="Delete Project"
                  >
                    <FaTrash />
                  </button>

                  {/* Project Name */}
                  <div>
                    <label className="block text-light-blue mb-2">Project Name</label>
                    <input 
                      type="text"
                      value={project.name}
                      onChange={(e) => handleEditProject(project.id, { name: e.target.value })}
                      className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                      placeholder="Enter project name"
                    />
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-light-blue mb-2">Start Date</label>
                    <input 
                      type="date"
                      value={project.startDate}
                      onChange={(e) => handleEditProject(project.id, { startDate: e.target.value })}
                      className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-light-blue mb-2">End Date</label>
                    <input 
                      type="date"
                      value={project.endDate || ''}
                      onChange={(e) => handleEditProject(project.id, { endDate: e.target.value })}
                      className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-light-blue mb-2">Status</label>
                    <select
                      value={project.status}
                      onChange={(e) => handleEditProject(project.id, { status: e.target.value })}
                      className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue"
                    >
                      <option value="Planned">Planned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </div>
                </div>
              ))):(
                <p className="text-gray-400 text-center">No projects assigned</p>
              )}
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditAdmin;