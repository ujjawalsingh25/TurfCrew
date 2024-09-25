import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const times = [
    {
      id: '0',
      type: 'morning',
      timings: '12 am - 9 am',
      icon: <Ionicons name="md-partly-sunny-outline" size={24} color="black" />,
    },
    {
      id: '1',
      type: 'Day',
      timings: '9 am - 4 pm',
      icon: <Feather name="sun" size={24} color="black" />,
    },
    {
      id: '2',
      type: 'evening',
      timings: '4pm - 9 pm',
      icon: <Feather name="sunset" size={24} color="black" />,
    },
    {
      id: '3',
      type: 'night',
      timings: '9pm am - 11 pm',
      icon: <Ionicons name="cloudy-night-outline" size={24} color="black" />,
    },
];

export default times;