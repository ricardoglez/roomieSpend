import {makeStyles} from '@material-ui/core/styles';

const appStyles = makeStyles( theme => {
  console.log(theme.palette)
    return {
        appWrapper:{
          height:'100%',
          justifyContent:'center',
          alignItems:'center',
          display:"flex",
          flexDirection:"column"
        },
        dashboardWrapper:{
          maxWidth:'80%',
          justifyContent:'center',
          alignItems: 'center',
          direction: 'column'
        },
        pageContent:{
            flex: '1 0 auto',
        },
        push:{
            height:'56px'
        },
        root: {
            flex:1,
            minWidth: '95%',
            color:'#fff',
          },
          content:{
              color:theme.palette.primary.main,
              textAlign: 'center'
          },
          inline: {
            display: 'inline',
            color:'#fff'
          },
          listItem:{
              borderRadius:theme.shape.borderRadius,
              backgroundColor: theme.palette.primary.main,
              marginTop:theme.spacing(1),
              border: `1px solid #fff`,
              display:'flex',
              flexDirection:'column'
          },
          contentFlex:{
              display:'flex',
              flexGrow:1,
              flexDirection:'row',
              alignItems:'center',
              width:'100%',
          },
          chipContainer:{
            display:'flex',
            width:'auto',
            marginRight:theme.spacing(.5),
          },
          alignStart:{
            alignItems: 'start',
          },
          numberData:{
            marginLeft:theme.spacing(.5),
            fontWeight: 'bolder',
            textAlign: 'end',
          },
          labelData:{
            textAlign:'end',
            fontWeight:'light'
          },
          flexRow:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'end'
          },
          fab: {
            margin: theme.spacing(1),
          },
          modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
          },
          appBar: {
            marginBottom: theme.spacing(2),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1)
          },
          userData:{
            paddingLeft:theme.spacing(2),
            paddingRight:theme.spacing(2),
          },
          userInfo:{
              float:'right'
          },
          mainHeader:{
              padding:theme.spacing(1)
          },
          bottomNav: { 
            flexGrow: 1,
            width: '100%',
            position: 'fixed',
            bottom: 0,
            display:"flex",
        },
        payedQnty:{
          color: theme.palette.primary.light,
          textDecoration:'line-through'
        }
    }
});

export { appStyles };