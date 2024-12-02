import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectAdminAuth } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { 
  FaProjectDiagram, 
  FaSave, 
  FaTimes, 
  FaPlus, 
  FaTrash,
  FaUser,
  FaCalendar,
  FaDollarSign,
  FaClipboardList
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProjectService = {
  createProject: async (projectData) => {
    try {
      // Simulate API call to create project
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Date.now(),
            ...projectData
          });
        }, 1000);
      });
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  fetchTeamMembers: async () => {
    // Simulate fetching team members
    return [
      { id: 1, name: 'John Doe', role: 'Project Manager', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', role: 'Lead Developer', email: 'jane@example.com' },
      { id: 3, name: 'Mike Johnson', role: 'Security Analyst', email: 'mike@example.com' },
      { id: 4, name: 'Emily Brown', role: 'UI/UX Designer', email: 'emily@example.com' },
    ];
  }
};

const CreateProject = () => {
  const isAdminAuthenticated = useSelector(selectAdminAuth);

  // If not an admin, redirect to home or login
  if (!isAdminAuthenticated) {
    // return <Navigate to="/" replace />;
    return (
        <div className="min-h-screen flex justify-center items-center bg-dark-background text-light-blue">
            <div className="text-center p-6 bg-dark-primary rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Access Denied</h2>
            <p className="text-sm">You are not an admin. Please log in with an admin account to access this page.</p>
            </div>
        </div>
    );
  }

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch team members on component mount
  React.useEffect(() => {
    const fetchMembers = async () => {
      try {
        const members = await ProjectService.fetchTeamMembers();
        setTeamMembers(members);
      } catch (error) {
        console.error('Failed to fetch team members', error);
      }
    };

    fetchMembers();
  }, []);

  const { 
    register, 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      tasks: [{ name: '', description: '', assignedTo: '', status: '', priority: '', dueDate: '' }],
      milestones: [{ name: '', description: '', status: '', completedDate: '' }]
    }
  });

  // Field Arrays for Dynamic Fields
  const { fields: taskFields, append: appendTask, remove: removeTask } = useFieldArray({
    control,
    name: "tasks"
  });

  const { fields: milestoneFields, append: appendMilestone, remove: removeMilestone } = useFieldArray({
    control,
    name: "milestones"
  });

  // Form Submission Handler
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const createdProject = await ProjectService.createProject(data);
      navigate(`/project/${createdProject.id}/view`);
    } catch (error) {
      console.error('Project creation failed', error);
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-dark-background via-dark-primary to-dark-background p-4 md:p-8"
    >
      <div className="container mx-auto max-w-6xl">
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="bg-dark-primary/90 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-light-blue/20 to-dark-primary/30 p-6 border-b border-slate-gray/30">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <FaProjectDiagram className="text-3xl text-light-blue" />
                <h1 className="text-2xl font-bold text-light-blue">
                  Create New Project
                </h1>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/project/projects')}
                  className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all flex items-center"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    bg-light-blue text-dark-primary px-4 py-2 rounded-lg 
                    hover:bg-opacity-90 transition-all flex items-center
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <FaSave className="mr-2" /> 
                  {isSubmitting ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </div>
          </div>

          {/* Project Details Section */}
          <div className="p-6 space-y-6">
            {/* Project Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaProjectDiagram className="mr-2 text-light-blue" />
                  Project Name
                </label>
                <input
                  type="text"
                  {...register('name', { 
                    required: 'Project name is required',
                    minLength: {
                      value: 3,
                      message: 'Project name must be at least 3 characters'
                    }
                  })}
                  className={`
                    w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                    border ${errors.name ? 'border-red-500' : 'border-slate-gray'}
                    text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                  `}
                  placeholder="Enter project name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Client */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaUser className="mr-2 text-light-blue" />
                  Client
                </label>
                <input
                  type="text"
                  {...register('client', { 
                    required: 'Client name is required'
                  })}
                  className={`
                    w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                    border ${errors.client ? 'border-red-500' : 'border-slate-gray'}
                    text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                  `}
                  placeholder="Enter client name"
                />
                {errors .client && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.client.message}
                  </p>
                )}
              </div>

              {/* Project Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaClipboardList className="mr-2 text-light-blue" />
                  Project Description
                </label>
                <textarea
                  {...register('description', { 
                    required: 'Project description is required',
                    minLength: {
                      value: 10,
                      message: 'Project description must be at least 10 characters'
                    }
                  })}
                  className={`
                    w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                    border ${errors.description ? 'border-red-500' : 'border-slate-gray'}
                    text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                  `}
                  placeholder="Enter project description"
                  rows="4"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Project Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaDollarSign className="mr-2 text-light-blue" />
                  Budget
                </label>
                <input
                  type="text"
                  {...register('budget', { 
                    required: 'Budget is required'
                  })}
                  className={`
                    w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                    border ${errors.budget ? 'border-red-500' : 'border-slate-gray'}
                    text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                  `}
                  placeholder="Enter project budget"
                />
                {errors.budget && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.budget.message}
                  </p>
                )}
              </div>

              {/* Project Dates */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaCalendar className="mr-2 text-light-blue" />
                  Start Date
                </label>
                <input
                  type="date"
                  {...register('startDate', { required: 'Start date is required' })}
                  className={`
                    w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                    border ${errors.startDate ? 'border-red-500' : 'border-slate-gray'}
                    text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                  `}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaCalendar className="mr-2 text-light-blue" />
                  End Date
                </label>
                <input
                  type="date"
                  {...register('endDate', { required: 'End date is required' })}
                  className={`
                    w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                    border ${errors.endDate ? 'border-red-500' : 'border-slate-gray'}
                    text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                  `}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Tasks Section */}
            <div>
              <h2 className="text-lg font-semibold text-light-blue mb-4">
                Tasks
              </h2>
              {taskFields.map((task, index) => (
                <div key={task.id} className="bg-dark-secondary p-4 rounded-lg mb-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Task Name
                      </label>
                      <input
                        type="text"
                        {...register(`tasks.${index}.name`, { required: 'Task name is required' })}
                        className={`
                          w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                          border ${errors.tasks?.[index]?.name ? 'border-red-500' : ' border-slate-gray'}
                          text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                        `}
                        placeholder="Enter task name"
                      />
                      {errors.tasks?.[index]?.name && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.tasks[index].name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        {...register(`tasks.${index}.description`, { required: 'Task description is required' })}
                        className={`
                          w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                          border ${errors.tasks?.[index]?.description ? 'border-red-500' : 'border-slate-gray'}
                          text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                        `}
                        placeholder="Enter task description"
                        rows="2"
                      />
                      {errors.tasks?.[index]?.description && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.tasks[index].description.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Assigned To
                      </label>
                      <select
                        {...register(`tasks.${index}.assignedTo`, { required: 'Assign a team member' })}
                        className={`
                          w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                          border ${errors.tasks?.[index]?.assignedTo ? 'border-red-500' : 'border-slate-gray'}
                          text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                        `}
                      >
                        <option value="">Select team member</option>
                        {teamMembers.map(member => (
                          <option key={member.id} value={member.id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                      {errors.tasks?.[index]?.assignedTo && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.tasks[index].assignedTo.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
                    <div className="w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => removeTask(index)}
                        className="flex items-center justify-center w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all space-x-2">
                        <FaTrash /> Remove Task
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendTask({ name: '', description: '', assignedTo: '', status: '', priority: '', dueDate: '' })}
                className="bg-light-blue text-dark-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center"
              >
                <FaPlus className="mr-2" /> Add Task
              </button>
            </div>

            {/* Milestones Section */}
            <div>
              <h2 className="text-lg font-semibold text-light-blue mb-4">
                Milestones
              </h2>
              {milestoneFields.map((milestone, index) => (
                <div key={milestone.id} className="bg-dark-secondary p-4 rounded-lg mb-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Milestone Name
                      </label>
                      <input
                        type="text"
                        {...register(`milestones.${index}.name`, { required: 'Milestone name is required' })}
                        className={`
                          w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                          border ${errors.milestones?.[index]?.name ? 'border-red-500' : 'border-slate-gray'}
                          text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                        `}
                        placeholder="Enter milestone name"
                      />
                      {errors.milestones?.[index]?.name && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.milestones[index].name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        {...register(`milestones.${index}.description`, { required: 'Milestone description is required' })}
                        className={`
                          w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                          border ${errors.milestones?.[index]?.description ? 'border-red-500' : 'border-slate-gray'}
                          text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                        `}
                        placeholder="Enter milestone description"
                        rows="2"
                      />
                      {errors.milestones?.[index]?.description && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.milestones[index].description.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        {...register(`milestones.${index}.status`, { required: 'Milestone status is required' })}
                        className={`
                          w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                          border ${errors.milestones?.[index]?.status ? 'border-red-500' : 'border-slate-gray'}
                          text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                        `}
                      >
                        <option value="">Select status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      {errors.milestones?.[index]?.status && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.milestones[index].status.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
                    <div className="w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="flex items-center justify-center w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all space-x-2"
                      >
                        <FaTrash /> Remove Milestone
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendMilestone({ name: '', description: '', status: '', completedDate: '' })}
                className="bg-light-blue text-dark-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center"
              >
                <FaPlus className="mr-2" /> Add Milestone
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateProject;