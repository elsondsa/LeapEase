import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 400,
    },
  },
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBar2: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  component: {
    borderRadius: 15,
    borderBlockColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    boxSizing: 'border-box',
    zIndex: '1100',
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    padding: '20px'
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
  mobileScreen: {
    border: '1px solid #ccc',
    borderRadius: '20px',
    padding: '20px',
    width: '150px', // Adjust width as needed
    height: '250px', // Adjust height as needed
    backgroundColor: '#f5f5f5',
    margin: 'auto',
    position: 'relative', // Needed to position the input field absolutely within
    boxShadow: '0px 0px 10px #aaa',
    overflowY: 'auto', // Enable scrolling for overflow content
    display: 'flex', // Changed to flex to better manage internal layout
    flexDirection: 'column', // Stack children vertically
  },
  screenHeader: {
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  responseContainer: {
    whiteSpace: 'pre-wrap',
  },
  parentContainer: {
    display: 'flex',
    flexDirection: 'row', // Align children in a row
    flexWrap: 'wrap', // Allow items to wrap to next line if not enough space
    gap: '10px', // Space between children
  },
  inputField: {
    position: 'absolute', // Position input field absolutely within mobileScreen
    bottom: '20px', // Distance from the bottom of mobileScreen
    left: '20px', // Align with the padding of mobileScreen
    right: '20px', // Ensure consistent padding on the right
    width: 'auto', // Adjust width to fit within mobileScreen's padding
    border: '1px solid black', // Add a black border to the input field
  },
  text: {
    padding: '5px'
  }
}));
