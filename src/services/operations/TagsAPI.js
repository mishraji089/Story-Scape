import { toast } from 'react-toastify';
import { apiConnector } from '../../services/apiconnector';
import { TagEndpoints } from '../../services/apis';

export function getAllTags(navigate) {
    return async (dispatch) => {
      const toastId = toast.loading('Loading...');
    //   dispatch(setLoading(true));
  
      try {
        const response = await apiConnector('GET', TagEndpoints.TAGS_API);
  
        console.log('GET ALL TAGS API RESPONSE............', response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        // Assuming you want to do something with the tags data
        // For example, dispatch an action to update state with tags
        // dispatch(setTags(response.data.tags));
  
        toast.success('Tags fetched successfully');
      } catch (error) {
        console.log('GET ALL TAGS API ERROR............', error);
        toast.error('Failed to fetch tags');
      }
  
    //   dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  }