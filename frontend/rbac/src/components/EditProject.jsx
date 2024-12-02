import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAdminAuth } from '../store/authSlice';
import { 
  FaProjectDiagram, 
  FaSave, 
  FaTimes, 
  FaExclamationCircle,
  FaPlus,
  FaTrash,
  FaEdit
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProjectService = {
  // Fetch project details
  fetchProjectDetails: async (projectId) => {
    try {
      // In a real-world scenario, this would be an API call
      return {
        id: projectId,
        name: 'Cybersecurity Upgrade Initiative',
        description: 'Comprehensive security system overhaul to enhance organizational cyber resilience',
        status: 'In Progress',
        startDate: '2023-01-15',
        endDate: '2023-12-31',
        priority: 'High',
        budget: '$1,500,000',
        client: 'VRV Security Solutions',
        teamMembers: [
          { 
            id: 1, 
            name: 'John Doe', 
            role: 'Project Manager', 
            email: 'john.doe@vrvsecurity.com' 
          },
          { 
            id: 2, 
            name: 'Jane Smith', 
            role: 'Lead Security Architect', 
            email: 'jane.smith@vrvsecurity.com' 
          },
          { 
            id: 3, 
            name: 'Mike Johnson', 
            role: 'Security Analyst', 
            email: 'mike.johnson@vrvsecurity.com' 
          }
        ],
        tasks: [
          {
            id: 1,
            name: 'Network Security Assessment',
            description: 'Conduct comprehensive network security audit',
            assignedTo: 1,
            status: 'In Progress',
            priority: 'High',
            dueDate: '2023-09-30'
          },
          {
            id: 2,
            name: 'Firewall Configuration',
            description: 'Update and configure enterprise firewall',
            assignedTo: 2,
            status: 'Pending',
            priority: 'Medium',
            dueDate: '2023-10-15'
          }
        ],
        milestones: [
          {
            id: 1,
            name: 'Initial Security Audit',
            description: 'Complete initial security assessment',
            status: 'Completed',
            completedDate: '2023-06-30'
          },
          {
            id: 2,
            name: 'Infrastructure Upgrade',
            description: 'Upgrade security infrastructure',
            status: 'In Progress',
            completedDate: null
          }
        ]
      };
    } catch (error) {
      console.error('Error fetching project details:', error);
      throw error;
    }
  },

  // Update entire project
  updateProject: async (projectId, projectData) => {
    try {
      // Simulate API call with validation
      const validatedData = ProjectService.validateProjectData(projectData);
      
      // In a real-world scenario, this would be an actual API call
      return {
        ...validatedData,
        id: projectId
      };
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Validate project data
  validateProjectData: (projectData) => {
    const errors = [];

    // Basic validation rules
    if (!projectData.name || projectData.name.length < 3) {
      errors.push('Project name must be at least 3 characters long');
    }

    if (!projectData.description || projectData.description.length < 10) {
      errors.push('Project description must be at least 10 characters long');
    }

    if (!projectData.status) {
      errors.push('Project status is required');
    }

    if (!projectData.startDate) {
      errors.push('Start date is required');
    }

    if (!projectData.endDate) {
      errors.push('End date is required');
    }

    if (new Date(projectData.startDate) > new Date(projectData.endDate)) {
      errors.push('Start date must be before end date');
    }

    // Validate tasks
    if (projectData.tasks && projectData.tasks.length > 0) {
      projectData.tasks.forEach((task, index) => {
        if (!task.name) errors.push(`Task ${index + 1}: Name is required`);
        if (!task.description) errors.push(`Task ${index + 1}: Description is required`);
        if (!task.status) errors.push(`Task ${index + 1}: Status is required`);
        if (!task.priority) errors.push(`Task ${index + 1}: Priority is required`);
        if (!task.dueDate) errors.push(`Task ${index + 1}: Due date is required`);
      });
    }

    // Validate milestones
    if (projectData.milestones && projectData.milestones.length > 0) {
      projectData.milestones.forEach((milestone, index) => {
        if (!milestone.name) errors.push(`Milestone ${index + 1}: Name is required`);
        if (!milestone.description) errors.push(`Milestone ${index + 1}: Description is required`);
        if (!milestone.status) errors.push(`Milestone ${index + 1}: Status is required`);
      });
    }

    // Throw validation errors if any
    if (errors.length > 0) {
      throw new Error(errors.join('; '));
    }

    return projectData;
  },

  // Add a new task to a project
  addTask: async (projectId, taskData) => {
    try {
      // Validate task data
      const validatedTask = ProjectService.validateTaskData(taskData);
      
      // Simulate API call to add task
      return {
        ...validatedTask,
        id: Date.now() // Generate temporary ID
      };
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  // Update an existing task
  updateTask: async (projectId, taskId, taskData) => {
    try {
      // Validate task data
      const validatedTask = ProjectService.validateTaskData(taskData);
      
      // Simulate API call to update task
      return {
        ...validatedTask,
        id: taskId
      };
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete a task from a project
  deleteTask: async (projectId, taskId) => {
    try {
      // Simulate API call to delete task
      return { success: true, message: 'Task deleted successfully' };
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Add a new milestone to a project
  addMilestone: async (projectId, milestoneData) => {
    try {
      // Validate milestone data
      const validatedMilestone = ProjectService.validateMilestoneData(milestoneData);
      
      // Simulate API call to add milestone
      return {
        ...validatedMilestone,
        id: Date.now() // Generate temporary ID
      };
    } catch (error) {
      console.error('Error adding milestone:', error);
      throw error;
    }
  },

  // Update an existing milestone
  updateMilestone: async (projectId, milestoneId, milestoneData) => {
    try {
      // Validate milestone data
      const validatedMilestone = ProjectService.validateMilestoneData(milestoneData);
      
      // Simulate API call to update milestone
      return {
        ...validatedMilestone,
        id: milestoneId
      };
    } catch (error) {
      console.error('Error updating milestone:', error);
      throw error;
    }
  },

  // Delete a milestone from a project
  deleteMilestone: async (projectId, milestoneId) => {
    try {
      // Simulate API call to delete milestone
      return { success: true, message: 'Milestone deleted successfully' };
    } catch (error) {
      console.error('Error deleting milestone:', error);
       throw error;
    }
  },

  // Validate task data
  validateTaskData: (taskData) => {
    const errors = [];

    if (!taskData.name) {
      errors.push('Task name is required');
    }

    if (!taskData.description) {
      errors.push('Task description is required');
    }

    if (!taskData.status) {
      errors.push('Task status is required');
    }

    if (!taskData.priority) {
      errors.push('Task priority is required');
    }

    if (!taskData.dueDate) {
      errors.push('Task due date is required');
    }

    if (errors.length > 0) {
      throw new Error(errors.join('; '));
    }

    return taskData;
  },

  // Validate milestone data
  validateMilestoneData: (milestoneData) => {
    const errors = [];

    if (!milestoneData.name) {
      errors.push('Milestone name is required');
    }

    if (!milestoneData.description) {
      errors.push('Milestone description is required');
    }

    if (!milestoneData.status) {
      errors.push('Milestone status is required');
    }

    if (errors.length > 0) {
      throw new Error(errors.join('; '));
    }

    return milestoneData;
  }
};

const EditProject = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const isAdminAuthenticated = useSelector(selectAdminAuth);
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { 
    register, 
    handleSubmit, 
    control, 
    formState: { errors }, 
    reset 
  } = useForm();

  // Field Arrays for Tasks and Milestones
  const { 
    fields: taskFields, 
    append: appendTask, 
    remove: removeTask 
  } = useFieldArray({
    control,
    name: "tasks"
  });

  const { 
    fields: milestoneFields, 
    append: appendMilestone, 
    remove: removeMilestone 
  } = useFieldArray({
    control,
    name: "milestones"
  });

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Redirect if not an admin
        if (!isAdminAuthenticated) {
          navigate('/projects');
          return;
        }

        setLoading(true);
        const projectDetails = await ProjectService.fetchProjectDetails(projectId);
        setProject(projectDetails);
        
        // Populate form with existing project data
        reset(projectDetails);
      } catch (err) {
        setError('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, isAdminAuthenticated, navigate, reset]);

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      // Validate admin status again
      if (!isAdminAuthenticated) {
        throw new Error('Unauthorized access');
      }

      // Call update service
      const updatedProject = await ProjectService.updateProject(projectId, data);
      
      // Redirect or show success message
      navigate(`/project/${projectId}/view`);
    } catch (err) {
      setError(err.message || 'Failed to update project');
    } finally {
      setSubmitting(false);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-background">
        <div className="text-light-blue text-2xl flex items-center">
          <FaProjectDiagram className="animate-pulse mr-3" />
          Loading Project Details...
        </div>
      </div>
    );
  }

  // Render error state
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
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-light-blue flex items-center">
                <FaProjectDiagram className="mr-3" />
                Edit Project
              </h1>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(`/project/${projectId}/view`)}
                  className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all flex items-center"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`
                    bg-light-blue text-dark-primary px-4 py-2 rounded-lg 
                    hover:bg-opacity-90 transition-all flex items-center
                    ${submitting ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <FaSave className="mr-2" /> 
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>

          {/* Project Details Section (from previous implementation) */}
          <div className="p-6 space-y-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
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

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Description
              </label>
              <textarea
                {...register('description', { 
                  required: 'Project description is required',
                  minLength: {
                    value: 10,
                    message: 'Description must be at least 10 characters'
                  }
                })}
                className={`
                  w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                  border ${errors.description ? 'border-red-500' : 'border-slate-gray'}
                  text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                `} placeholder="Enter project description"
                rows="3"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                {...register('status', { required: 'Project status is required' })}
                className={`
                  w-full px-4 py-3 rounded-lg bg-dark-primary/60 
                  border ${errors.status ? 'border-red-500' : 'border-slate-gray'}
                  text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue
                `}
              >
                <option value="" disabled>Select status</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.status.message}
                </p>
              )}
            </div>

            {/* Start and End Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
          </div>

          {/* Tasks Section */}
          <div className="p-6 bg-dark-primary/60 border-t border-slate-gray/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-light-blue">
                Project Tasks
              </h3>
              <button
                type="button"
                onClick={() => appendTask({ 
                  name: '', 
                  description: '', 
                  assignedTo: '', 
                  status: '', 
                  priority: '', 
                  dueDate: '' 
                })}
                className="bg-light-blue text-dark-primary px-4 py-2 rounded-lg flex items-center"
              >
                <FaPlus className="mr-2" /> Add Task
              </button>
            </div>

            {taskFields.map((field, index) => (
              <div 
                key={field.id} 
                className="bg-dark-primary/40 rounded-lg p-4 mb-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Task Name
                  </label>
                  <input
                    type="text"
                    {...register(`tasks.${index}.name`, { required: 'Task name is required' })}
                    className={`w-full px-4 py-3 rounded-lg bg-dark-primary/60 border ${errors.tasks?.[index]?.name ? 'border-red-500' : 'border-slate-gray'} text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue`}
                    placeholder="Enter task name"
                  />
                  {errors.tasks?.[index]?.name && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.tasks[index].name.message}
                    </p>
                  )}
                </div>

                < div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register(`tasks.${index}.description`, { required: 'Description is required' })}
                    className={`w-full px-4 py-3 rounded-lg bg-dark-primary/60 border ${errors.tasks?.[index]?.description ? 'border-red-500' : 'border-slate-gray'} text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue`}
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
                    {...register(`tasks.${index}.assignedTo`, { required: 'Assign to a team member' })}
                    className={`w-full px-4 py-3 rounded-lg bg-dark-primary/60 border ${errors.tasks?.[index]?.assignedTo ? 'border-red-500' : 'border-slate-gray'} text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue`}
                  >
                    <option value="" disabled>Select team member</option>
                    {project.teamMembers.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                  {errors.tasks?.[index]?.assignedTo && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.tasks[index].assignedTo.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    {...register(`tasks.${index}.status`, { required: 'Task status is required' })}
                    className={`w-full px-4 py-3 rounded-lg bg-dark-primary/60 border ${errors.tasks?.[index]?.status ? 'border-red-500' : 'border-slate-gray'} text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue`}
                  >
                    <option value="" disabled>Select status</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                  {errors.tasks?.[index]?.status && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.tasks[index].status.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    {...register(`tasks.${index}.priority`, { required: 'Task priority is required' })}
                    className={`w-full px-4 py-3 rounded-lg bg-dark-primary/60 border ${errors.tasks?.[index]?.priority ? 'border-red-500' : 'border-slate-gray'} text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue`}
                  >
                    <option value="" disabled>Select priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  {errors.tasks?.[index]?.priority && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.tasks[index].priority.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    {...register(`tasks.${index}.dueDate`, { required: 'Due date is required' })}
                    className={`w-full px-4 py-3 rounded-lg bg-dark-primary/60 border ${errors.tasks?.[index]?.dueDate ? 'border-red-500' : 'border-slate-gray'} text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue`}
                  />
                  {errors.tasks?.[index]?.dueDate && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.tasks[index].dueDate.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => removeTask(index)}
                    className="text-red- 500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            {/* Milestones Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-light-blue">
                  Project Milestones
                </h3>
                <button
                  type="button"
                  onClick={() => appendMilestone({ 
                    name: '', 
                    description: '', 
                    status: '', 
                    completedDate: '' 
                  })}
                  className="bg-light-blue text-dark-primary px-4 py-2 rounded-lg flex items-center"
                >
                  <FaPlus className="mr-2" /> Add Milestone
                </button>
              </div>

              {milestoneFields.map((field, index) => (
                <div 
                  key={field.id} 
                  className="bg-dark-primary/40 rounded-lg p-4 mb-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Milestone Name
                      </label>
                      <input
                        type="text"
                        {...register(`milestones.${index}.name`, { required: 'Milestone name is required' })}
                        className={`w-full px-4 py-3 rounded-lg bg-dark-primary/60 border ${errors.milestones?.[index]?.name ? 'border-red-500' : 'border-slate-gray'} text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue`}
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
                        {...register(`milestones.${index}.description`, { required: 'Description is required' })}
                        className={`w-full px-4 py-3 rounded-lg bg-dark-primary/60 border ${errors.milestones?.[index]?.description ? 'border-red-500' : 'border-slate-gray'} text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue`}
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
                        className={`w-full px-4 py-3 rounded-lg bg-dark-primary/60 border ${errors.milestones?.[index]?.status ? 'border-red-500' : 'border-slate-gray'} text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue`}
                      >
                        <option value="" disabled>Select status</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Pending">Pending</option>
                      </select>
                      {errors.milestones?.[index]?.status && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.milestones[index].status.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Completed Date
                      </label>
                      <input
                        type="date"
                        {...register(`milestones.${index}.completedDate`)}
                        className={`w-full px-4 py-3 rounded-lg bg-dark-primary/60 border ${errors.milestones?.[index]?.completedDate ? 'border-red-500' : 'border-slate-gray'} text-light-blue focus:outline-none focus:ring-2 focus:ring-light-blue`}
                      />
                      {errors.milestones?.[index]?.completedDate && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.milestones[index].completedDate.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EditProject;