import React, { useState } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaBuilding, 
  FaCalendar, 
  FaProjectDiagram,
  FaHistory,
  FaUsers, 
  FaUserShield
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Admin Profile Data
  const adminProfile = {
    name: 'John Doe',
    email: 'john.doe@vrvsecurity.com',
    role: 'Senior Security Architect',
    department: 'Cyber Defense',
    joinDate: 'January 15, 2020',
    profileImage: 'https://via.placeholder.com/150',
  };

  // Current Projects
  const currentProjects = [
    {
      id: 1,
      name: 'Enterprise Security Audit',
      client: 'TechCorp Solutions',
      startDate: '2023-09-01',
      status: 'In Progress',
      progress: 65
    },
    {
      id: 2,
      name: 'Cloud Infrastructure Security',
      client: 'Global Financial Services',
      startDate: '2023-10-15',
      status: 'In Progress',
      progress: 40
    }
  ];

  // Past Projects
  const pastProjects = [
    {
      id: 1,
      name: 'Network Penetration Testing',
      client: 'Innovative Startup Inc.',
      startDate: '2023-01-15',
      endDate: '2023-06-30',
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Compliance Framework Development',
      client: 'HealthCare Systems',
      startDate: '2022-11-01',
      endDate: '2023-03-15',
      status: 'Completed'
    }
  ];

  const ManagementButtons = () => (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link 
        to="/admin/manage-users"
        className="flex items-center justify-center space-x-3 
        bg-dark-primary/50 p-4 rounded-lg 
        hover:bg-slate-gray/30 transition-all 
        border border-slate-gray/30"
      >
        <FaUsers className="text-light-blue text-2xl" />
        <span className="text-light-blue font-semibold">
          Manage All Users
        </span>
      </Link>
      <Link 
        to="/admin/admins"
        className="flex items-center justify-center space-x-3 
        bg-dark-primary/50 p-4 rounded-lg 
        hover:bg-slate-gray/30 transition-all 
        border border-slate-gray/30"
      >
        <FaUserShield className="text-light-blue text-2xl" />
        <span className="text-light-blue font-semibold">
          Manage Admins
        </span>
      </Link>
    </div>
  );

  const ProfileSection = () => (
    <div className="bg-dark-primary/80 rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-gray/30 
      transform transition-all hover:scale-[1.01]">
      <div className="flex flex-col md:flex-row items-center mb-6 space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative">
          <img 
            src={adminProfile.profileImage} 
            alt={adminProfile.name} 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-light-blue/50 shadow-lg"
          />
          <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-dark-primary animate-pulse"></div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-light-blue tracking-wide">{adminProfile.name}</h2>
          <p className="text-gray-300 text-base md:text-lg mt-1">{adminProfile.role}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border-b border-slate-gray/30 pb-6">
        <div className="flex items-center space-x-3 justify-center md:justify-start">
          <FaEnvelope className="text-light-blue text-xl" />
          <span className="text-xs md:text-sm text-gray-200 truncate">{adminProfile.email}</span>
        </div>
        <div className="flex items-center space-x-3 justify-center md:justify-start">
          <FaBuilding className="text-light-blue text-xl" />
          <span className="text-xs md:text-sm text-gray-200">{adminProfile.department}</span>
        </div>
        <div className="flex items-center space-x-3 justify-center md:justify-start">
          <FaCalendar className="text-light-blue text-xl" />
          <span className="text-xs md:text-sm text-gray-200">Joined: {adminProfile.joinDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-dark-primary/50 rounded-lg p-4 flex items-center space-x-4 border border-slate-gray/30">
          <div className="p-3 rounded-full bg-green-400/20">
            <FaProjectDiagram className="text-2xl text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Active Projects</p>
            <h3 className="text-xl font-bold text-light-blue">{currentProjects.length}</h3>
          </div>
        </div>
        <div className="bg-dark-primary/50 rounded-lg p-4 flex items-center space-x-4 border border-slate-gray/30">
          <div className="p-3 rounded-full bg-blue-400/20">
            <FaHistory className="text-2xl text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Completed Projects</p>
            <h3 className="text-xl font-bold text-light-blue">{pastProjects.length}</h3>
          </div>
        </div>
      </div>

      {/* Management Buttons */}
      <ManagementButtons />
    </div>
  );

  const ProjectSection = () => (
    <div className="space-y-6 mt-8">
      {/* Current Projects */}
      <div className="bg-dark-primary/80 rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-gray/30">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <h3 className="text-xl md:text-2xl font-bold text-light-blue flex items-center">
            <FaProjectDiagram className="mr-2 md:mr-4 text-green-400" />
            Current Projects
          </h3>
          <span className="bg-slate-gray/30 px-3 py- 1 rounded-full text-xs md:text-sm text-gray-300">
            Total: {currentProjects.length}
          </span>
        </div>
        
        <div className="space-y-4">
          {currentProjects.map(project => (
            <div 
              key={project.id} 
              className="bg-dark-primary/50 p-4 md:p-5 rounded-lg border border-slate-gray/30 hover:border-light-blue/50 transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 space-y-2 md:space-y-0">
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-light-blue">{project.name}</h4>
                  <p className="text-xs md:text-sm text-gray-300">{project.client}</p>
                </div>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                  {project.status}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-dark-primary/30 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-400 h-2 rounded-full" 
                  style={{width: `${project.progress}%`}}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Started: {project.startDate}</span>
                <span>{project.progress}% Complete</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Projects */}
      <div className="bg-dark-primary/80 rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-gray/30">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <h3 className="text-xl md:text-2xl font-bold text-light-blue flex items-center">
            <FaHistory className="mr-2 md:mr-4 text-blue-400" />
            Past Projects
          </h3>
          <span className="bg-slate-gray/30 px-3 py-1 rounded-full text-xs md:text-sm text-gray-300">
            Total: {pastProjects.length}
          </span>
        </div>
        
        <div className="space-y-4">
          {pastProjects.map(project => (
            <div 
              key={project.id} 
              className="bg-dark-primary/50 p-4 md:p-5 rounded-lg border border-slate-gray/30 hover:border-light-blue/50 transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 space-y-2 md:space-y-0">
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-light-blue">{project.name}</h4>
                  <p className="text-xs md:text-sm text-gray-300">{project.client}</p>
                </div>
                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                  {project.status}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Started: {project.startDate}</span>
                <span>Ended: {project.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 md:p-8 bg-dark-background">
      <div className="container mx-auto">
        <ProfileSection />
        <ProjectSection />
      </div>
    </div>
  );
};

export default AdminDashboard;