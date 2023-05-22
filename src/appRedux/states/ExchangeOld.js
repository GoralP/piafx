class ExchangeState {

    constructor () {
        
        this.exchangeList = []
        this.totalrecord = 0
        this.ticker_code = {}
        this.seachList = []
        this.seletedticker_code = {}
        this.selectedExchange = {}
        this.state = 'initial';
        this.page = 0;
        this.priceData = [];
        this.cotData = [];
        this.ecinData = [];
        this.selectedCots = [];
        this.graphdata = [];
        this.selectedGRAPH = [];
        this.selectedEcin = [];
        this.moveDate = '';
        this.scrollData = [];
        this.addClicked1 = '';
        this.tableData = [];
        this.cotclicked = '';
        this.ecinclicked = '';
        this.acntdata = [];
        this.acntdatadone = [];
        this.scrollerDates = [];
        this.mekkoData = [];
        this.mekkodatadone = [];
        this.mekkotype = 1;
        this.progress = false;
        this.loader = false;
        this.cotloader = false;
        this.oneoone = false;
        this.cotoneoone = false;
        this.oneJson = [];
        this.oneoonetodb = [];
        this.oneoonetodb_respo = [];
        this.getannotation_respo = [];
        this.getcotannotation_respo = [];
        this.response_array = {status:false,message:''};
        this.response_status = false;
        this.savenotes = [];
        this.getnotes = [];
        this.getnotes_respo = [];
        this.getoimovers = [];
        this.getoiperticker = [];
        this.notesstatus = {status:false};
        this.clearcotstatus = {status:false};
        this.clearecinstatus = {status:false};
        this.savetable = [];
        this.gettable = [];
        this.gettable_respo = [];
        this.tablestatus = {status:false};
        this.mostviewedticker = [];
        this.mostviewedticker_respo = [];
        this.scalechange = {status:false};
        this.splitscreen_status = false;
        this.arrangegroup_status = false;
        this.savesettings = [];
        this.cnfrmmodal = {ticker:'',status:false};
        this.test= false;
        this.bigchart=false;
        this.cotgridstatus=false;
        this.cotscalestatus=false;
        this.increaseheight=false;
        this.absolute=false;
        this.sapratetechnicalindicator=[];
        this.cottechnicalindicator={};
        this.drawingArray={};
        this.ecindrawingArray={};
        this.getdacm = [];
        this.getdacm_respo = [];
        this.cotdacm = {cot:[],ecin:[],ai:[]};
        this.ecindacm = [];
        this.savestatus = true;
        this.calldacm = false;
        this.cotnameArray = [];
        this.getnews = [];
        this.newsData = [];
        this.exchangeModal = false;
        this.sectorModal = false;
        this.newsDataMain = [];
        this.hNet = {status:false,netgroup:'',nettype:'combined'};
        this.priceforecast = {status:false,type:''};
        this.cotforecast = {status:false,type:''};
        this.gettrend = [];
        this.trendData = [];
        this.getgauge = {};
        this.gaugeData = [];
        this.selectedTrend = [];
        this.gaugePeriod = {'slope':63,'william':10,'nclra':3};
        this.trendAIPeriod = {'slope':63,'william':10,'nclra':3};
        this.getpricecot = [];
        this.pricecotData = [];
        this.gettrendAI = [];
        this.trendAIData = [];
        this.tsrmvisible = {status:false,type:''};
        this.trendmlvisible = {status:false,type:''};
        this.newsindicator = [];
        this.getequity = [];
        this.equityData = [];
        this.userId = '';
        this.getecinunderprice = '';
        this.ecinunderpriceData = [];
        this.snrData = [];
        this.snrRequestData = {};
        this.snrSavedStatus = false;
        this.correllData = [];
        this.videoLinks = [];
        this.eventsData = [];
        this.eventsSNR2Data = [];
        this.patternEventsData = [];
        this.pricesection = [];
        this.snrbreakoutdata = [];
        this.cotreportdata = [];
        this.seasonalitydata = [];
        this.variousdata = [];
        // this.mlsma = {status:false,value:2};
    }

}
export default ExchangeState