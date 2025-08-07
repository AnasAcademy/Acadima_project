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
  const [targetOptions, setTargetOptions] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [webinars, setWebinars] = useState([]); // Add webinars state
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

      // Fetch target options from the classes endpoint
      const targetOptionsResponse = await fetch(
        'https://api.lxera.net/api/development/organization/vodafone/classes/targetOptions',
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

      // Fetch bundles from the bundles endpoint with type=program
      const bundlesResponse = await fetch(
        'https://api.lxera.net/api/development/organization/vodafone/bundles?type=program',
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

      // Fetch webinars from the webinars endpoint with type=webinar
      const webinarsResponse = await fetch(
        'https://api.lxera.net/api/development/organization/vodafone/webinars?type=webinar',
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

      if (!targetOptionsResponse.ok) {
        throw new Error(`Target Options API error! status: ${targetOptionsResponse.status}`);
      }

      if (!bundlesResponse.ok) {
        throw new Error(`Bundles API error! status: ${bundlesResponse.status}`);
      }

      if (!webinarsResponse.ok) {
        throw new Error(`Webinars API error! status: ${webinarsResponse.status}`);
      }

      const studentsData = await studentsResponse.json();
      const rolesData = await rolesResponse.json();
      const targetOptionsData = await targetOptionsResponse.json();
      const bundlesData = await bundlesResponse.json();
      const webinarsData = await webinarsResponse.json();

      // Extract statuses and categories from students endpoint
      setStatuses(studentsData.statusOptions || studentsData.statuses || []);
      setCategories(studentsData.category || studentsData.categories || []);
      
      // Extract and format roles from roles endpoint - storing only id and name
      const formattedRoles = rolesData.roles ? rolesData.roles.map(role => ({
        id: role.id,
        name: role.name
      })) : [];
      
      setRoles(formattedRoles);

      // Extract target options from target options endpoint
      setTargetOptions(targetOptionsData.targetOptions || []);

      // Extract and format bundles from bundles endpoint
      const formattedBundles = bundlesData.bundles ? bundlesData.bundles.map(bundle => ({
        id: bundle.id,
        title: bundle.translations?.title || bundle.bundle_name_certificate || `Bundle ${bundle.id}`,
        slug: bundle.slug,
        category_id: bundle.category_id,
        teacher_id: bundle.teacher_id,
        creator_id: bundle.creator_id,
        price: bundle.price,
        discount_rate: bundle.discount_rate
      })) : [];
      
      setBundles(formattedBundles);

      // Extract and format webinars from webinars endpoint
      const formattedWebinars = webinarsData.webinars && webinarsData.webinars.data ? 
        webinarsData.webinars.data.map(webinar => {
          
          return {
            id: webinar.id,
            title: webinar.translations?.[0].title || webinar.title || `Webinar ${webinar.id}`,
            teacher: webinar.teacher,
            category_id: webinar.category_id,
            status: webinar.status,
          };
        }) : [];

      setWebinars(formattedWebinars);

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
    targetOptions,
    bundles,
    webinars, // Add webinars to context value
    loading,
    error,
    refetch,
    // Helper functions for common use cases
    getStatusOptions: () => statuses.map(status => ({
      value: status.value || status,
      label: status.value || status
    })),
    getRoleOptions: () => roles.map(role => ({
      value: role.id || role.value || role,
      label: role.name || role.label || role
    })),
    getCategoryOptions: () => categories.map(category => ({
      value: category.value || category,
      label: category.label || category
    })),
    getTargetOptions: () => targetOptions.map(target => ({
      value: target.value || target,
      label: target.value || target, // This will be the translation key
      translationKey: target.value || target // Keep the key for translation
    })),
    getBundleOptions: () => bundles.map(bundle => ({
      value: bundle.id,
      label: bundle.title
    })),
    // Add helper function for webinar options
    getWebinarOptions: () => {
      const options = webinars.map(webinar => {
        return {
          value: webinar.id,
          label: webinar.title 
        };
      });
      console.log('Webinar options:', options); // Debug log
      return options;
    }
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;
