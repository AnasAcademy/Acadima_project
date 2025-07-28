"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserDataContext = createContext();

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

export const UserDataProvider = ({ children }) => {
  const [statuses, setStatuses] = useState([]);
  const [roles, setRoles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch statuses and categories from the main students endpoint
      const studentsResponse = await fetch(
        'https://api.lxera.net/api/development/organization/vodafone/students/all?page=1',
        {
          method: 'GET',
          headers: {
            'x-api-key': '1234',
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA',
          },
        }
      );

      // Fetch roles from the separate roles endpoint
      const rolesResponse = await fetch(
        'https://api.lxera.net/api/development/organization/vodafone/users/roles',
        {
          method: 'GET',
          headers: {
            'x-api-key': '1234',
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA',
          },
        }
      );

      if (!studentsResponse.ok) {
        throw new Error(`Students API error! status: ${studentsResponse.status}`);
      }

      if (!rolesResponse.ok) {
        throw new Error(`Roles API error! status: ${rolesResponse.status}`);
      }

      const studentsData = await studentsResponse.json();
      const rolesData = await rolesResponse.json();

      // Extract statuses and categories from students endpoint
      setStatuses(studentsData.statusOptions || studentsData.statuses || []);
      setCategories(studentsData.category || studentsData.categories || []);
      
      // Extract and format roles from roles endpoint - storing only id and name
      const formattedRoles = rolesData.roles ? rolesData.roles.map(role => ({
        id: role.id,
        name: role.name
      })) : [];
      
      setRoles(formattedRoles);

    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to refetch data if needed
  const refetch = () => {
    fetchUserData();
  };

  const value = {
    statuses,
    roles,
    categories,
    loading,
    error,
    refetch,
    // Helper functions for common use cases
    getStatusOptions: () => statuses.map(status => ({
      value: status.value || status,
      label: status.label || status
    })),
    getRoleOptions: () => roles.map(role => ({
      value: role.id || role.value || role,
      label: role.name || role.label || role
    })),
    getCategoryOptions: () => categories.map(category => ({
      value: category.value || category,
      label: category.label || category
    }))
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
