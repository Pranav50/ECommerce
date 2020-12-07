import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    marginTop:'4rem',
    height:'auto',
    marginBottom:'-3px'
  },
  media: {
    height: 200,
    textAlign:'center' // 16:9
  },
  // image: {
  //   height: '25px'
  // },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));