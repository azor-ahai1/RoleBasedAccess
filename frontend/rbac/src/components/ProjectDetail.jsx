import React, { useState, useEffect } from 'react';
import { selectAdminAuth } from '../store/authSlice';
import { useSelector } from 'react-redux';
import { 
  FaProjectDiagram, 
  FaCalendarAlt, 
  FaUser, 
  FaTasks, 
  FaCheckCircle, 
  FaExclamationCircle,
  FaEdit,
  FaClipboardList,
  FaChartLine,
  FaUsers,
  FaCloudUploadAlt,
  FaSpinner, 
  FaArrowLeft 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetailService = {
  fetchProjectDetails: async (projectId) => {
    // Simulated API call
    return {
      id: projectId,
      name: 'Cybersecurity Upgrade Initiative',
      description: 'Comprehensive security system overhaul to enhance organizational cyber resilience',
      status: 'In Progress',
      startDate: '2023-01-15',
      endDate: '2023-12-31',
      progress: 65,
      priority: 'High',
      budget: '$1,500,000',
      client: 'VRV Security Solutions',
      
      teamMembers: [
        {
          id: 1,
          name: 'John Doe',
          role: 'Project Manager',
          profileImage: 'https://i.pravatar.cc/150?u=1',
        },
        {
          id: 2,
          name: 'Jane Smith',
          role: 'Lead Security Architect',
          profileImage: 'https://i.pravatar.cc/150?u=2',
        },
        {
          id: 3,
          name: 'Mike Johnson',
          role: 'Security Analyst',
          profileImage: 'https://i.pravatar.cc/150?u=3',
        }
      ],
      
      tasks: [
        {
          id: 1,
          name: 'Network Security Assessment',
          status: 'Completed',
          assignedTo: 'Jane Smith',
          dueDate: '2023-06-30',
          priority: 'High'
        },
        {
          id: 2,
          name: 'Firewall Configuration',
          status: 'In Progress',
          assignedTo: 'Mike Johnson',
          dueDate: '2023-09-15',
          priority: 'Medium'
        },
        {
          id: 3,
          name: 'Security Policy Review',
          status: 'Pending',
          assignedTo: 'John Doe',
          dueDate: '2023-10-30',
          priority: 'Low'
        }
      ],
      
      milestones: [
        {
          id: 1,
          name: 'Initial Security Audit',
          completedDate: '2023-03-15',
          status: 'Completed'
        },
        {
          id: 2,
          name: 'Infrastructure Upgrade',
          completedDate: null,
          status: 'In Progress'
        },
        {
          id: 3,
          name: 'Final Security Implementation',
          completedDate: null,
          status: 'Pending'
        }
      ],
      
      risks: [
        {
          id: 1,
          description: 'Potential system downtime during upgrades',
          impact: 'High',
          mitigation: 'Scheduled maintenance during off-peak hours'
        },
        {
          id: 2,
          description: 'Compatibility issues with legacy systems',
          impact: 'Medium',
          mitigation: 'Comprehensive testing and phased implementation'
        }
      ]
    };
  }
};

const ProjectDetail = () => {
    const isAdminAuthenticated = useSelector(selectAdminAuth);
    const { projectId } = useParams();
    const navigate = useNavigate();
    
    const [projectDetails, setProjectDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchProjectDetails = async () => {
        try {
          setLoading(true);
          const details = await ProjectDetailService.fetchProjectDetails(projectId);
          setProjectDetails(details);
        } catch (err) {
          setError('Failed to load project details');
        } finally {
          setLoading(false);
        }
      };
  
      fetchProjectDetails();
    }, [projectId]);
  
    if (loading) return <LoadingIndicator />;
    if (error) return <ErrorDisplay message={error} />;
    if (!projectDetails) return null;
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-background via-dark-primary to-dark-background p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto max-w-7xl"
        >
          <div className="bg-dark-primary/90 rounded-3xl overflow-hidden shadow-2xl">
            {/* Project Header */}
            <div className="bg-gradient-to-r from-light-blue/20 to-dark-primary/30 p-4 md:p-6 border-b border-slate-gray/30">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
                    <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                        <button 
                            onClick={() => navigate('/project/projects')}
                            className="text-light-blue hover:text-white mr-5"
                            aria-label="Go back to admin list"
                        >
                            <FaArrowLeft className="text-xl" />
                        </button>
                        <FaProjectDiagram className="mr-3 text-xl md:text-2xl text-light-blue" />
                        <h1 className="text-xl md:text-2xl font-bold text-light-blue mr-3">
                        {projectDetails.name}
                        </h1>
                    </div>
                    <span 
                        className={`px-3 py-1 rounded-full text-xs font-bold self-start md:self-auto
                        ${projectDetails.status === 'Completed' 
                            ? 'bg-green-500/20 text-green-400'
                            : projectDetails.status === 'In Progress'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-blue-500/20 text-blue-400'}
                        `}
                    >
                        {projectDetails.status}
                    </span>
                    </div>
                    {isAdminAuthenticated && (
                        <div className="w-full md:w-auto">
                            <button 
                            onClick={() => navigate(`/project/${projectId}/edit`)}
                            className="w-full md:w-auto flex items-center justify-center 
                            bg-light-blue text-dark-primary px-4 py-2 rounded-lg 
                            hover:bg-opacity-90 transition-all"
                            >
                            <FaEdit className="inline mr-2" /> Edit Project
                            </button>
                        </div>
                    )}
                </div>
            </div>
  
            {/* Project Overview */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <ProjectInfoCard 
                  title="Project Description" 
                  icon={<FaClipboardList className="text-light-blue" />}
                >
                  <p className="text-gray-400">{projectDetails.description}</p>
                </ProjectInfoCard>
  
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ProjectInfoCard 
                    title="Project Progress" 
                    icon={<FaChartLine className="text-light-blue" />}
                  >
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Overall Progress</span>
                        <span>{projectDetails.progress}%</span>
                      </div>
                      <div className="w-full bg-dark-primary/50 rounded-full h-2.5">
                        <div 
                          className="bg-light-blue h-2.5 rounded-full" 
                          style={{ width: `${projectDetails.progress}%` }}
                        ></div>
                      </div>
                    </div> 
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Start Date</span>
                      <span>{projectDetails.startDate}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>End Date</span>
                      <span>{projectDetails.endDate}</span>
                    </div>
                  </ProjectInfoCard>
  
                  <ProjectInfoCard 
                    title="Budget" 
                    icon={<FaCloudUploadAlt className="text-light-blue" />}
                  >
                    <p className="text-gray-400">{projectDetails.budget}</p>
                  </ProjectInfoCard>
                </div>
              </div>
  
              <div className="space-y-6">
                <ProjectInfoCard 
                  title="Client" 
                  icon={<FaUser  className="text-light-blue" />}
                >
                  <p className="text-gray-400">{projectDetails.client}</p>
                </ProjectInfoCard>
  
                <ProjectInfoCard 
                  title="Priority" 
                  icon={<FaExclamationCircle className="text-light-blue" />}
                >
                  <p className="text-gray-400">{projectDetails.priority}</p>
                </ProjectInfoCard>
              </div>
            </div>
  
            {/* Team Members Section */}
            <div className="p-6 border-t border-slate-gray/30">
              <h3 className="text-xl font-semibold text-light-blue mb-4">
                Team Members
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {projectDetails.teamMembers.map(member => (
                  <div key={member.id} className="bg-dark-primary/40 rounded-xl p-4">
                    <img 
                      src={member.profileImage} 
                      alt={member.name} 
                      className="w-16 h-16 rounded-full mb-2"
                    />
                    <h4 className="text-lg font-bold text-light-blue">{member.name}</h4>
                    <p className="text-gray-400">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Tasks Section */}
            <div className="p-6 border-t border-slate-gray/30">
              <h3 className="text-xl font-semibold text-light-blue mb-4">
                Tasks
              </h3>
              <ul className="space-y-4">
                {projectDetails.tasks.map(task => (
                  <li key={task.id} className="bg-dark-primary/40 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-bold text-light-blue">{task.name}</h4>
                      <p className="text-gray-400">Assigned to: {task.assignedTo}</p>
                      <p className="text-gray-400">Due Date: {task.dueDate}</p>
                    </div>
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-bold
                        ${task.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-400'
                          : task.status === 'In Progress'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'}
                      `}
                    >
                      {task.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Milestones Section */}
            <div className="p-6 border-t border-slate-gray/30">
              <h3 className="text-xl font-semibold text-light-blue mb-4">
                Milestones
              </h3>
              <ul className="space-y-4">
                {projectDetails.milestones.map(milestone => (
                  <li key={milestone.id} className="bg-dark-primary/40 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-bold text-light-blue">{milestone.name}</h4>
                      <p className="text-gray-400">Completed Date: {milestone.completedDate || 'N/A'}</p>
                    </div>
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-bold
                        ${milestone.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-400'
                          : milestone.status === 'In Progress'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'}
                      `}
                    >
                      {milestone.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };
  
//   export default ProjectDetail;
  

// ProjectInfoCard component for reusable card layout
const ProjectInfoCard = ({ title, icon, children }) => (
  <div className="bg-dark-primary/40 rounded-xl p-4">
    <div className="flex items-center mb-2">
      {icon}
      <h4 className="text-lg font-bold text-light-blue ml-2">{title}</h4>
    </div>
    {children}
  </div>
);

  const LoadingIndicator = () => (
    <div className="min-h-screen flex justify-center items-center bg-dark-background">
      <div className="flex items-center text-light-blue">
        <FaSpinner className="animate-spin mr-3 text-4xl" />
        <span className="text-xl">Loading Project Details...</span>
      </div>
    </div>
  );
  
  const ErrorDisplay = ({ message }) => (
    <div className="min-h-screen flex justify-center items-center bg-dark-background">
      <div className="flex items-center text-red-500">
        <FaExclamationCircle className="mr-3 text-4xl" />
        <span className="text-xl">{message}</span>
      </div>
    </div>
  );

export default ProjectDetail;