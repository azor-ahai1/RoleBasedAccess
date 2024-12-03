import React, { useState } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaIdBadge, 
  FaProjectDiagram, 
  FaUserShield,
  FaSave,
  FaTimes,
  FaPlus,
  FaTasks,
  FaTrash 
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectAdminAuth } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';

// User Service Mock
const UserService = {
  createUser: async (userData) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Date.now(),
            ...userData
          });
        }, 1000);
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  fetchPossibleRoles: () => [
    'Security Analyst',
    'Network Engineer',
    'Compliance Specialist',
    'IT Administrator',
    'Project Manager'
  ],

  fetchPossiblePermissions: () => [
    'View Security Logs',
    'Manage User Access',
    'Conduct Vulnerability Assessments',
    'Update Security Policies',
    'Access Audit Reports'
  ]
};

// Input Component for Reusability
const InputWithIcon = ({ 
  icon: Icon, 
  register, 
  name, 
  placeholder, 
  type = 'text', 
  errors,
  ...rest 
}) => (
  <div>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-gray" />}
      <input 
        type={type}
        {...register(name, rest)}
        className={`
          w-full ${Icon ? 'pl-10' : ''} 
          bg-dark-primary/50 border border-slate-gray/30 
          rounded-lg p-3 text-light-blue 
          focus:ring-2 focus:ring-light-blue/50 
          transition-all
        `}
        placeholder={placeholder}
      />
    </div>
    {errors[name] && (
      <p className="text-red-400 text-sm mt-2">
        {errors[name].message}
      </p>
    )}
  </div>
);

const CreateUser = () => {
  const navigate = useNavigate();
  const isAdminAuthenticated = useSelector(selectAdminAuth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roles] = useState(UserService.fetchPossibleRoles());
  const [permissions] = useState(UserService.fetchPossiblePermissions());

  // Access Denied Rendering
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-dark-background text-light-blue">
        <div className="text-center p-6 bg-dark-primary rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Access Denied</h2>
          <p className="text-sm">You are not authorized to create users. Admin access required.</p>
        </div>
      </div>
    );
  }

  // Form Configuration
  const { 
    register, 
    control,
    handleSubmit, 
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectTasks: [{ 
        projectName: '', 
        taskName: '', 
        status: 'Pending', 
        priority: 'Low', 
        dueDate: '' 
      }],
      projects: [{ 
        name: '', 
        startDate: '', 
        endDate: '', 
        status: 'Planned' 
      }]
    }
  });

  // Field Arrays
  const { 
    fields: taskFields, 
    append: appendTask, 
    remove: removeTask 
  } = useFieldArray({
    control,
    name: "projectTasks"
  });

  const { 
    fields: projectFields, 
    append: appendProject, 
    remove: removeProject 
  } = useFieldArray({
    control,
    name: "projects"
  });

  // Submit Handler
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const createdUser = await UserService.createUser(data);
      navigate(`/users/${createdUser.id}/view`);
    } catch (error) {
      console.error('User creation failed', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-background via-dark-primary to-dark-background p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-6xl"
      >
        <div className="bg-dark-primary/90 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-light-blue/20 to-dark-primary/30 p-6 border-b border-slate-gray/30">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <FaUserShield className="text-3xl text-light-blue" />
                <h1 className="text-2xl font-bold text-light-blue">
                  Create New User
                </h1>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/manage-users')}
                  className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all flex items-center"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
                <button
                  form="create-user-form"
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    bg-light-blue text-dark-primary px-4 py-2 rounded-lg 
                    hover:bg-opacity-90 transition-all flex items-center
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <FaSave className="mr-2" /> 
                  {isSubmitting ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <form 
            id="create-user-form"
            onSubmit={handleSubmit(onSubmit)} 
            className="p-6 space-y-8"
          >
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWithIcon
                icon={FaUser}
                register={register}
                name="name"
                placeholder="Enter full name"
                errors={errors}
                required="Name is required"
                minLength={{ value: 2, message: 'Name must be at least 2 characters' }}
              />
              <InputWithIcon
                icon={FaEnvelope}
                register={register}
                name="email"
                type="email"
                placeholder="Enter email address"
                errors={errors}
                required="Email is required"
                pattern={{ value: /\S+@\S+\.\S+/, message: 'Invalid email address' }}
              />
            </div>

            {/* Role and Permissions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-light-blue mb-2 font-medium">Role</label>
                <select 
                  {...register('role', { required: 'Role is required' })}
                  className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue focus:ring-2 focus:ring-light-blue/50 transition-all"
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {errors.role && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-light-blue font-medium">
                    Permissions
                    <span className="text-red-400 ml-1">*</span>
                    </label>
                    <span className="text-xs text-slate-gray">
                    Select multiple (Ctrl/Cmd + Click)
                    </span>
                </div>
                <div className="relative">
                    <select 
                    {...register('permissions', { 
                        required: 'At least one permission is required',
                        validate: (value) => value.length > 0 || 'Select at least one permission'
                    })}
                    multiple
                    size={5}
                    className="
                        w-full 
                        bg-dark-primary/60 
                        border 
                        border-slate-gray/30 
                        rounded-lg 
                        p-3 
                        text-light-blue 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-light-blue/50 
                        transition-all 
                        space-y-1
                    "
                    >
                    {permissions.map((permission) => (
                        <option 
                        key={permission} 
                        value={permission}
                        className="
                            hover:bg-light-blue/10 
                            selected:bg-light-blue/30 
                            py-2 
                            px-3 
                            rounded 
                            transition-colors 
                            duration-200
                        "
                        >
                        {permission}
                        </option>
                    ))}
                    </select>
                    
                    {/* Custom dropdown indicator */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-gray">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path 
                        fillRule="evenodd" 
                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                        />
                    </svg>
                    </div>
                </div>

                {/* Error Message with Icon */}
                {errors.permissions && (
                    <div className="flex items-center mt-2 space-x-2 text-red-400">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path 
                        fillRule="evenodd" 
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                        clipRule="evenodd" 
                        />
                    </svg>
                    <p className="text-sm">{errors.permissions.message}</p>
                    </div>
                )}
                </div>
            </div>

            {/* Tasks Section */}
            <div className="mt-8">
                <h2 className="text-lg font-bold text-light-blue mb-4 flex items-center">
                    <FaTasks className="mr-2" /> Tasks
                </h2>
                {taskFields.map((task, index) => (
                    <div 
                    key={task.id} 
                    className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4 mb-4 items-center"
                    >
                    <input 
                        type="text"
                        {...register(`projectTasks.${index}.taskName`, { required: 'Task name is required' })}
                        className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue focus:ring-2 focus:ring-light-blue/50 transition-all"
                        placeholder="Task Name"
                    />
                    <input 
                        type="text"
                        {...register(`projectTasks.${index}.projectName`, { required: 'Project name is required' })}
                        className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue focus:ring-2 focus:ring-light-blue/50 transition-all"
                        placeholder="Project Name"
                    />
                    <div className="flex justify-end">
                        <button 
                        type="button" 
                        onClick={() => removeTask(index)} 
                        className="bg-red-500 text-white rounded-lg p-2 hover:bg-red-600 transition-colors"
                        aria-label="Remove Task"
                        >
                        <FaTrash />
                        </button>
                    </div>
                    </div>
                ))}
                <div className="flex justify-end mt-4">
                    <button 
                    type="button" 
                    onClick={() => appendTask({ taskName: '', projectName: '' })} 
                    className="bg-light-blue text-dark-primary rounded-lg px-4 py-2 flex items-center hover:bg-opacity-90 transition-colors"
                    >
                    <FaPlus className="mr-2" /> Add Task
                    </button>
                </div>
            </div>

            {/* Projects Section */}
            <div className="mt-8">
                <h2 className="text-lg font-bold text-light-blue mb-4 flex items-center">
                    <FaProjectDiagram className="mr-2" /> Projects
                </h2>
                {projectFields.map((project, index) => (
                    <div 
                    key={project.id} 
                    className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_0.5fr] gap-4 mb-4 items-center"
                    >
                    <input 
                        type="text"
                        {...register(`projects.${index}.name`, { required: 'Project name is required' })}
                        className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue focus:ring-2 focus:ring-light-blue/50 transition-all"
                        placeholder="Project Name"
                    />
                    <input 
                        type="date"
                        {...register(`projects.${index}.startDate`, { required: 'Start date is required' })}
                        className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue focus:ring-2 focus:ring-light-blue/50 transition-all"
                    />
                    <input 
                        type="date"
                        {...register(`projects.${index}.endDate`, { required: 'End date is required' })}
                        className="w-full bg-dark-primary/50 border border-slate-gray/30 rounded-lg p-3 text-light-blue focus:ring-2 focus:ring-light-blue/50 transition-all"
                    />
                    <div className="flex justify-end">
                        <button 
                        type="button" 
                        onClick={() => removeProject(index)} 
                        className="bg-red-500 text-white rounded-lg p-2 hover:bg-red-600 transition-colors"
                        aria-label="Remove Project"
                        >
                        <FaTrash />
                        </button>
                    </div>
                    </div>
                ))}
                <div className="flex justify-end mt-4">
                    <button 
                    type="button" 
                    onClick={() => appendProject({ name: '', startDate: '', endDate: '', status: 'Planned' })} 
                    className="bg-light-blue text-dark-primary rounded-lg px-4 py-2 flex items-center hover:bg-opacity-90 transition-colors"
                    >
                    <FaPlus className="mr-2" /> Add Project
                    </button>
                </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateUser ;