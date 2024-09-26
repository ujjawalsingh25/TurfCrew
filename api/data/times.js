  import Feather from 'react-native-vector-icons/Feather';
  import Fontisto from '@expo/vector-icons/Fontisto';
  import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

  const times = [
      {
        id: '0',
        type: 'Morning',
        timings: '5 AM - 7 AM',
        icon: <MaterialCommunityIcons name="weather-sunset" size={40} color="black" />,
      },
      {
        id: '1',
        type: 'Afternoon',
        timings: '9 AM - 3 PM',
        icon: <Feather name="sun" size={40} color="black" />
      },
      {
        id: '2',
        type: 'Evening',
        timings: '4pm - 7 PM',
        icon: <Feather name="sunset" size={40} color="black" />,
      },
      {
        id: '3',
        type: 'Night',
        timings: '8 AM - 11 PM',
        icon: <Fontisto name="night-alt-cloudy" size={35} color="black" />,
      },
  ];

  export default times;