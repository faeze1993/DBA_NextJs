import _ from "lodash";

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
      height: 20,
      width: '100%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      direction:'ltr'
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div className="my-3" style={containerStyles}>
        <div style={fillerStyles}>
          <span className="px-1" style={labelStyles}>{`${_.round(completed)}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  