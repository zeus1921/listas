const info = {
  url: "https://wind-bow.glitch.me/helix/streams?",
  streamers: [
    "mindfulmeck",
    "agathontv",
    "goncalopaul99",
    "kojuropp",
    "ironndf",
    "MrWilsonTeixeira",
    "sardzzzz",
    "r3l0ud",
    "tsimao14",
    "MR_BOOMHD",
    "akelacena",
    "giogmr",
    "carlozPDA",
    "nunogamerhdyt",
    "filipechaby22",
    "dannykill8",
    "romathegamerfm",
    "zesaxofonista",
    "crespim2"
  ]
};

function Unpacker(props) {
  let cN = props.status;
  let show = props.show;
  console.log(show)
  if (cN == "online") {
      let vis = show=="all"||show=="onOnly"?true:false;
    if (vis){
    return props.list.map((x, i) => {
  
      return (
        <div style={{vis}} className={cN} key={i}>
          <a href={"http://twitch.tv/" + x.user_name} target="_blank">
            <p>{x.user_name}</p> <p>{x.title}</p>
            <img src={x.thumbnail_url.replace(/\{width\}|\{height\}/g, "120")} />
          </a>
        </div>
      );
    });
    }else{
      return (<div></div>);
    }
  } else if (cN == "offline") {
    let vis = show=="all"||show=="offOnly"?true:false;
    
    if (vis){
   
    let arr = props.off;
    return arr.map((x, i) => {
      return (
        <div className={cN} key={i}>
          <a href={"http://twitch.tv/" + x}>{x}</a>
          <p>User Is Currently Offline</p>
        </div>
      );
    });
  }else{
    return (
    <div></div>)
  }
  }
  
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      online: [],
      offline: [],
      all: this.props.info.streamers,
      show : 'all'
    };
    this.showOnline = this.showOnline.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleChange() {}
  
  showOnline(){
    let on = document.getElementsByClassName('online');
    console.log(on.style.display);
  }

  handleClick(e) {
    switch(e.target.id){
        case "online":
        this.setState({
          show:"onOnly"
        });
        break;
      case "offline":
        this.setState({
          show:"offOnly"
        });
        break;
      case "all":
        this.setState({
          show:"all"
        });
        break;
    }
  }

  getData() {
    let urlStr = this.props.info.url;
    let arr = this.props.info.streamers.slice();
    let first = arr.slice(0, arr.length - 1);
    first.map((x) => {
      let addStr = "user_login=" + x + "&";
      urlStr += addStr;
    });
    urlStr += "user_login=" + arr[arr.length - 1];
    fetch(urlStr)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.data.map((x) => {
          let z = this.state.online;
          this.setState({
            online: z.concat(x)
          });
          let streamers = this.props.info.streamers;
        });
      });
  }

  render() {
    let show = this.state.show;
    let on = this.state.online,
      all = this.state.all;
    let onUsers = on.map((x) => x.user_name);
    let offUsers = all.filter((x) => !onUsers.includes(x));
    return (
      <div className="main">
        <div className="banner">
          <h1>FMPT Streams</h1>
          <div className="buttons">
            <button
              onClick={this.handleClick}
              className="button"
              id="online"
            >
              <i id="online" className="far fa-eye" />
            </button>
            <button
              onClick={this.handleClick}
       
              className="button"
              id="offline"
            >
              <i id="offline" className="far fa-eye-slash"   />
            </button>
            <button
              onClick={this.handleClick}
              className="button"
              id="all"
            >
              <i id="all" className="far fa-user" />
            </button>
          </div>
        </div>
        <div className="content">
          <Unpacker list={on} status={"online"} show={show}  />
          <Unpacker status={"offline"} off={offUsers} show={show} />
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

ReactDOM.render(<App info={info} />, document.getElementById("app"));
