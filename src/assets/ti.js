import React, {Component,PureComponent} from "react";
import {Layout, Popover, Row ,Col} from "antd";
import {AutoComplete,Modal,Dropdown,Icon,Menu,DatePicker,Button,Progress,message,Select,Input,InputNumber} from "antd";
function handleChange (event)  {
    // console.log('aspljjj')
    // setState({ [event.target.name] : event.target.value});
  }
var series_option = <select className="ti_modal_fields" name="indicator_series" id="indicator_series">
    <option>Area</option>
    <option>Column</option>
    <option selected>Line</option>
    </select>
export const cci = 
    <div>
        <form id="indicator_form">
        <Row align="center"><h3>Commodity Channel Index</h3></Row>
        <hr />
        <Row>
        <Col lg={12}>
            <lable>Period</lable>
            <input className="ti_modal_fields"  type="number" placeholder="20"  name="period" onChange={handleChange} />
        </Col>
        <Col lg={12}>
            <lable>Series Type</lable>
            {series_option}
        </Col>
        <input type="hidden" name="ti_name" value="Commodity Channel Index" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>Developed by Donald Lambert and featured in Commodities magazine in 1980, the Commodity Channel Index (CCI) is a versatile indicator that can be used to identify a new trend or warn of extreme conditions. Lambert originally developed CCI to identify cyclical turns in commodities, but the indicator can successfully applied to indices, ETFs, stocks and other securities. In general, CCI measures the current price level relative to an average price level over a given period of time. CCI is relatively high when prices are far above their average. CCI is relatively low when prices are far below their average. In this manner, CCI can be used to identify overbought and oversold levels.</p>
        </Row>
        </form>
    </div>;
export const  williamsR = 
    <div>
        <form id="indicator_form">
        <Row align="center"><h3>Williams %R</h3></Row>
        <hr />
        <Row>
        <Col lg={12}>
        <lable>Period</lable>
        <input className="ti_modal_fields" type="number" placeholder="10" name="period_w" onChange={handleChange} />
        </Col>
        <Col lg={12}>
        <lable>Series Type</lable>
        {series_option}
        </Col>
        <input type="hidden" name="ti_name" value="Williams %R" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>Williams %R, or just %R, is a momentum indicator showing the current closing price in relation to the high and low of the past N days (for a given N). It was developed by trader and author Larry Williams and is used in the stock and commodities markets.</p>
        </Row>
        </form>
    </div>;
export const sma = 
    <div>
        <form id="indicator_form">
            <Row align="center"><h3>Simple Moving Average</h3></Row>
            <hr />
            <Row>
            <Col lg={12}>
            <lable>Period</lable>
            <input className="ti_modal_fields" placeholder="20" type="number"  name="period_sma" onChange={handleChange} />
            </Col>
            <Col lg={12}>
            <lable>Series Type</lable>
            {series_option}
            </Col>
            <input type="hidden" name="ti_name" value="Simple Moving Average" />
            </Row>
            <br />
            <Row>
                <strong>Description :</strong>
                <p>A Simple Moving Average is a trending indicator that is displayed as a single line that shows the mean price during a specified period of time. For example, a 20-day SMA shows the average stock price during the last 20 trading periods (including the current period).</p>
            </Row>
        </form>
    </div>;
export const bbands = 
    <div>
        <form id="indicator_form">
        <Row align="center"><h3>Bollinger Bands</h3></Row>
        <hr />
        <Row>
        <Col lg={12}>
        <lable>Period</lable>
        <input className="ti_modal_fields" type="number" placeholder="20"  name="period_bbands" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Deviation</lable>
        <input  className="ti_modal_fields" type="number" placeholder="2"  name="deviation_bbands" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Middle Series Type</lable>
        {series_option}
        </Col>
        <Col lg={12}>
        <lable>Upper Series Type</lable>
        {series_option}
        </Col>
        <Col lg={12}>
        <lable>Lower Series Type</lable>
        {series_option}
        </Col>
        <input type="hidden" name="ti_name" value="Bollinger Bands" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>Bollinger Bands are a volatility indicator that is displayed as two lines (bands): one drawn above a simple moving average of the price and one - below. These bands move closer to the moving average when price volatility is low and move farther away from the moving average when price volatility increases.</p>
        </Row>
        </form>
    </div>
export const bbandsB = 
    <div>
        <form id="indicator_form">
        <Row align="center"><h3>Bollinger Bands %B</h3></Row>
        <hr />
        <Row>
        <Col lg={12}>
        <lable>Period</lable>
        <input className="ti_modal_fields" type="number" placeholder="20"  name="period_bbandsB" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Deviation</lable>
        <input  className="ti_modal_fields" type="number" placeholder="2"  name="deviation_bbandsB" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Series Type</lable>
        {series_option}
        </Col>
        <input type="hidden" name="ti_name" value="Bollinger Bands %B" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>Bollinger Bands %B is an indicator derived from Bollinger Bands.</p>
        </Row>
        </form>
    </div>
export const bbandsWidth = 
    <div>
        <form id="indicator_form">
        <Row align="center"><h3>Bollinger Bands Width</h3></Row>
        <hr />
        <Row>
        <Col lg={12}>
        <lable>Period</lable>
        <input className="ti_modal_fields" type="number" placeholder="20"  name="period_bbandsB" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Deviation</lable>
        <input  className="ti_modal_fields" type="number" placeholder="2"  name="deviation_bbandsB" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Series Type</lable>
        {series_option}
        </Col>
        <input type="hidden" name="ti_name" value="Bollinger Bands Width" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>Bollinger Bands Width is an indicator derived from Bollinger Bands.Non-normalized Bollinger Bands Width measures the distance, or difference, between the upper band and the lower band. Bollinger Bands Width decreases Bollinger Bands narrow and increases as Bollinger Bands widen because Bollinger Bands are based on the standard deviation.</p>
        </Row>
        </form>
    </div>
export const adl = 
    <div>
        <form id="indicator_form">
        <Row align="center"><h3>Accumulation Distribution Line</h3></Row>
        <hr />
        <Row>
        <Col lg={24}>
            <lable>Series Type</lable>
            {series_option}
        </Col>
        <input type="hidden"  name="ti_name" value="Accumulation Distribution Line" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>Developed by Marc Chaikin, the Accumulation Distribution Line is a volume-based indicator designed to measure the cumulative flow of money into and out of a security. Chaikin originally referred to the indicator as the Cumulative Money Flow Line. As with cumulative indicators, the Accumulation Distribution Line is a running total of each period's Money Flow Volume. First, a multiplier is calculated based on the relationship of the close to the high-low range. Second, the Money Flow Multiplier is multiplied by the period's volume to come up with a Money Flow Volume. A running total of the Money Flow Volume forms the Accumulation Distribution Line. Chartists can use this indicator to affirm a security's underlying trend or anticipate reversals when the indicator diverges from the security price.</p>
        </Row>
        </form>
    </div>
export const ama = 
    <div>
        <form id="indicator_form">
        <Row align="center"><h3>Adaptive Moving Average</h3></Row>
        <hr />
        <Row>
        <Col lg={12}>
        <lable>Period</lable>
        <input className="ti_modal_fields" type="number" placeholder="20"  name="period_ama" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Fast Period</lable>
        <input className="ti_modal_fields" type="number" placeholder="2"  name="fast_period_ama" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Slow Period</lable>
        <input className="ti_modal_fields" type="number" placeholder="30"  name="slow_period_ama" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Series Type</lable>
        {series_option}
        </Col>
        <input type="hidden" name="ti_name" value="Adaptive Moving Average" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>Bollinger Bands are a volatility indicator that is displayed as two lines (bands): one drawn above a simple moving average of the price and one - below. These bands move closer to the moving average when price volatility is low and move farther away from the moving average when price volatility increases.</p>
        </Row>
        </form>
    </div>
export const ema = 
    <div>
        <form id="indicator_form">
            <Row align="center"><h3>Exponential moving average</h3></Row>
            <hr />
            <Row>
            <Col lg={12}>
            <lable>Period</lable>
            <input className="ti_modal_fields" placeholder="20" type="number"  name="period_ema" onChange={handleChange} />
            </Col>
            <Col lg={12}>
            <lable>Series Type</lable>
            {series_option}
            </Col>
            <input type="hidden" name="ti_name" value="Exponential moving average" />
            </Row>
            <br />
            <Row>
                <strong>Description :</strong>
                <p>An Exponential Moving Average is a trending indicator - a single line that shows the weighted mean of the stock price during a specified period of time. This type of moving average that is similar to a Simple Moving Average, except that more weight is given to the latest data.</p>
            </Row>
        </form>
    </div>;
export const momentum = 
<div>
    <form id="indicator_form">
        <Row align="center"><h3>Momentum</h3></Row>
        <hr />
        <Row>
        <Col lg={12}>
        <lable>Period</lable>
        <input className="ti_modal_fields" placeholder="14" type="number"  name="period_momentum" onChange={handleChange} />
        </Col>
        <Col lg={12}>
        <lable>Series Type</lable>
        {series_option}
        </Col>
        <input type="hidden" name="ti_name" value="Momentum" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>The Momentum indicator is a speed of movement indicator, that is designed to identify the speed (or strength) of a price movement. The momentum indicator compares the most recent closing price to a previous closing price and may be used as a trend-following oscillator (similar to the Moving Average Convergence Divergence (MACD)).</p>
        </Row>
    </form>
</div>;
export const macd = 
    <div>
        <form id="indicator_form">
        <Row align="center"><h3>Moving Average Convergence/Divergence</h3></Row>
        <hr />
        <Row>
        <Col lg={12}>
        <lable>Fast Period</lable>
        <input className="ti_modal_fields" type="number" placeholder="12"  name="fast_period_macd" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Slow Period</lable>
        <input className="ti_modal_fields" type="number" placeholder="26"  name="slow_period_macd" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Signal Period</lable>
        <input className="ti_modal_fields" type="number" placeholder="9"  name="period_macd" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Macd Series Type</lable>
        {series_option}
        </Col>
        <Col lg={12}>
        <lable>Signal Series Type</lable>
        {series_option}
        </Col>
        <Col lg={12}>
        <lable>Histogram Series Type</lable>
        <select className="ti_modal_fields" name="histogram_series" id="histogram_series">
            <option>Area</option>
            <option selected>Column</option>
            <option>Line</option>
        </select>
        </Col>
        <input type="hidden" name="ti_name" value="Moving Average Convergence/Divergence" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>The Moving Average Convergence/Divergence (MACD) is a momentum indicator that consists of two lines - an indicator line and a signal line. The indicator line displays the difference between two exponential moving averages with different smoothing factors, and the signal line displays an exponential moving average of the difference between mentioned two exponential moving averages.</p>
        </Row>
        </form>
    </div>;
export const obv = 
    <div>
        <form id="indicator_form">
        <Row align="center"><h3>On Balance Volume</h3></Row>
        <hr />
        <Row>
        <Col lg={24}>
            <lable>Series Type</lable>
            {series_option}
        </Col>
        <input type="hidden"  name="ti_name" value="On Balance Volume" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>On Balance Volume (OBV) measures buying and selling pressure as a cumulative indicator that adds volume on up days and subtracts volume on down days. OBV was developed by Joe Granville and introduced in his 1963 book, Granville's New Key to Stock Market Profits. It was one of the first indicators to measure positive and negative volume flow. Chartists can look for divergences between OBV and price to predict price movements or use OBV to confirm price trends.</p>
        </Row>
        </form>
    </div>
export const rsi = 
    <div>
        <form id="indicator_form">
            <Row align="center"><h3>Relative Strength Index</h3></Row>
            <hr />
            <Row>
            <Col lg={12}>
            <lable>Period</lable>
            <input className="ti_modal_fields" placeholder="14" type="number"  name="period_rsi" onChange={handleChange} />
            </Col>
            <Col lg={12}>
            <lable>Series Type</lable>
            {series_option}
            </Col>
            <input type="hidden" name="ti_name" value="Relative Strength Index" />
            </Row>
            <br />
            <Row>
                <strong>Description :</strong>
                <p>The Relative Strength Index (RSI) oscillator is a momentum indicator that consists of one line that moves in a range between 0 and 100.</p>
            </Row>
        </form>
    </div>;
export const roc = 
<div>
    <form id="indicator_form">
        <Row align="center"><h3>Rate of Change (ROC)</h3></Row>
        <hr />
        <Row>
        <Col lg={12}>
        <lable>Period</lable>
        <input className="ti_modal_fields" placeholder="20" type="number"  name="period_roc" onChange={handleChange} />
        </Col>
        <Col lg={12}>
        <lable>Series Type</lable>
        {series_option}
        </Col>
        <input type="hidden" name="ti_name" value="Rate of Change" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>The Rate of Change oscillator is a momentum indicator that consists of one line. The ROC measures the percentage change in the price from one trading period to the next. If the percentage change is big, the ROC line moves harshly up or down, depending on price changing direction. In other case - if the percentage change is small, the ROC line moves slowly up or down, depending on the price changing direction.</p>
        </Row>
    </form>
</div>;
export const mma = 
<div>
    <form id="indicator_form">
        <Row align="center"><h3>Modified Moving Average (MMA)</h3></Row>
        <hr />
        <Row>
        <Col lg={12}>
        <lable>Period</lable>
        <input className="ti_modal_fields" placeholder="20" type="number"  name="period_mma" onChange={handleChange} />
        </Col>
        <Col lg={12}>
        <lable>Series Type</lable>
        {series_option}
        </Col>
        <input type="hidden" name="ti_name" value="Modified Moving Average" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>A Modified Moving Average (MMA) (also known as Running Moving Average (RMA), or SMoothed Moving Average (SMMA)) is an indicator that shows the average value of a security's price over a period of time. It works very similar to the Exponential Moving Average, they are equivalent but for different periods (e.g. the MMA value for a 14-day period will be the same as EMA-value for a 27-days period).MMA is partly calculated like SMA: the first point of the MMA is calculated the same way it is done for SMA. However, other points are calculated differently:the new price is added first and then the last average is subtracted from the resulting sum.</p>
        </Row>
    </form>
</div>;
export const stochastic = 
    <div>
        <form id="indicator_form">
            <Row align="center"><h3>Stochastic Oscillator</h3></Row>
            <hr />
            <Row>
            <Col lg={12}>
            <lable>K-Period</lable>
            <input className="ti_modal_fields" type="number" placeholder="14"  name="k-period" onChange={handleChange}/>
            </Col>
            <Col lg={12}>
            <lable>Kma Period</lable>
            <input className="ti_modal_fields" type="number" placeholder="1"  name="kma-period" onChange={handleChange}/>
            </Col>
            <Col lg={12}>
            <lable>D-Period</lable>
            <input className="ti_modal_fields" type="number" placeholder="3"  name="d-period" onChange={handleChange}/>
            </Col>
            <Col lg={12}>
            <lable>Kma Type</lable>
            <select className="ti_modal_fields" name="kma_type" id="kma_type">
                <option>SMA</option>
                <option>EMA</option>
            </select>
            </Col>
            <Col lg={12}>
            <lable>Dma Type</lable>
            <select className="ti_modal_fields" name="dma_type" id="dma_type">
                <option>SMA</option>
                <option>EMA</option>
            </select>
            </Col>
            <Col lg={12}>
            <lable>K-Series Type</lable>
            {series_option}
            </Col>
            <Col lg={12}>
            <lable>D-Series Type</lable>
            {series_option}
            </Col>
            
            <input type="hidden" name="ti_name" value="Stochastic Oscillator " />
            </Row>
            <br />
            <Row>
                <strong>Description :</strong>
                <p>The Slow Stochastic Oscillator is a momentum indicator that consists of two lines - %K and %D, these lines move in the range between 0 and 100. The slow stochastic shows the interrelation of the current closing price to the trading range in the past. If the current closing price is toward the top of the past trading range, %K moves higher. If the current closing price is toward the bottom of the past trading range, %K moves lower.</p>
            </Row>
        </form>
    </div>;
export const psar = 
    <div>
        <form id="indicator_form">
        <Row align="center"><h3>Parabolic SAR (PSAR)</h3></Row>
        <hr />
        <Row>
        <Col lg={12}>
        <lable>Acceleration Factor Start</lable>
        <input className="ti_modal_fields" type="number" placeholder="0.02"  name="acceleration_factor_start" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Acceleration Factorincrement</lable>
        <input className="ti_modal_fields" type="number" placeholder="0.02"  name="acceleration_factorincrement" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Acceleration Factor Maximum</lable>
        <input className="ti_modal_fields" type="number" placeholder="0.02"  name="acceleration_factor_maximum" onChange={handleChange}/>
        </Col>
        <Col lg={12}>
        <lable>Series Type</lable>
        <select className="ti_modal_fields" name="indicator_series" id="indicator_series">
            <option>Area</option>
            <option>Column</option>
            <option>Line</option>
            <option selected>Marker</option>
            {/* <option >Circle</option> */}
        </select>
        </Col>
        <input type="hidden" name="ti_name" value="Parabolic SAR" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>Parabolic SAR (SAR - stop and reverse) is a method devised by J. Welles Wilder, Jr, to find trends in market prices or securities. It may be used as a trailing stop loss based on prices tending to stay within a parabolic curve during a strong trend.</p>
        </Row>
        </form>
    </div>;
export const atr = 
    <div>
        <form id="indicator_form">
            <Row align="center"><h3>Average True Range (ATR)</h3></Row>
            <hr />
            <Row>
            <Col lg={12}>
            <lable>Period</lable>
            <input className="ti_modal_fields" placeholder="14" type="number"  name="period_atr" onChange={handleChange} />
            </Col>
            <Col lg={12}>
            <lable>Series Type</lable>
            {series_option}
            </Col>
            <input type="hidden" name="ti_name" value="Average True Range" />
            </Row>
            <br />
            <Row>
                <strong>Description :</strong>
                <p>Developed by J. Welles Wilder, the Average True Range (ATR) is an indicator that measures volatility. As with most of his indicators, Wilder designed ATR with commodities and daily prices in mind. Commodities are frequently more volatile than stocks. They were are often subject to gaps and limit moves, which occur when a commodity opens up or down its maximum allowed move for the session. A volatility formula based only on the high-low range would fail to capture volatility from gap or limit moves. Wilder created Average True Range to capture this 'missing' volatility. It is important to remember that ATR does not provide an indication of price direction, just volatility.</p>
            </Row>
        </form>
    </div>;
export const poiv = 
    <div>
        <form id="indicator_form">
        <Row align="center"><h3>POIV</h3></Row>
        <hr />
        <Row>
        <Col lg={24}>
            <lable>Series Type</lable>
            {series_option}
        </Col>
        <input type="hidden"  name="ti_name" value="POIV" />
        </Row>
        <br />
        <Row>
            <strong>Description :</strong>
            <p>On Balance Volume (OBV) measures buying and selling pressure as a cumulative indicator that adds volume on up days and subtracts volume on down days. OBV was developed by Joe Granville and introduced in his 1963 book, Granville's New Key to Stock Market Profits. It was one of the first indicators to measure positive and negative volume flow. Chartists can look for divergences between OBV and price to predict price movements or use OBV to confirm price trends.</p>
        </Row>
        </form>
    </div>
export const obo = 
<div>
    <form id="indicator_form">
    <Row align="center"><h3>OBO</h3></Row>
    <hr />
    <Row>
    <Col lg={24}>
        <lable>Series Type</lable>
        {series_option}
    </Col>
    <input type="hidden"  name="ti_name" value="OBO" />
    </Row>
    <br />
    <Row>
        <strong>Description :</strong>
        <p>On Balance Volume (OBV) measures buying and selling pressure as a cumulative indicator that adds volume on up days and subtracts volume on down days. OBV was developed by Joe Granville and introduced in his 1963 book, Granville's New Key to Stock Market Profits. It was one of the first indicators to measure positive and negative volume flow. Chartists can look for divergences between OBV and price to predict price movements or use OBV to confirm price trends.</p>
    </Row>
    </form>
</div>
export const sDev = 
<div>
    <form id="indicator_form">
    <Row align="center"><h3>Standard Deviation</h3></Row>
    <hr />
    <Row>
    <Col lg={24}>
        <lable>Series Type</lable>
        {series_option}
    </Col>
    <input type="hidden"  name="ti_name" value="sDev" />
    </Row>
    <br />
    <Row>
        <strong>Description :</strong>
        <p>Standard deviation is the measure of dispersion of a set of data from its mean. It measures the absolute variability of a distribution; the higher the dispersion or variability, the greater is the standard deviation and greater will be the magnitude of the deviation of the value from their mean.</p>
    </Row>
    </form>
</div>
export const adx = 
<div>
    <form id="indicator_form">
    <Row align="center"><h3>Average Directional Movement Index</h3></Row>
    <hr />
    <Row>
    <Col lg={12}>
        <lable>Period</lable>
        <input className="ti_modal_fields" placeholder="20" type="number"  name="period_atr" onChange={handleChange} />
    </Col>
    <Col lg={12}>
        <lable>Series Type</lable>
        {series_option}
    </Col>
    <input type="hidden"  name="ti_name" value="adx" />
    </Row>
    <br />
    <Row>
        <strong>Description :</strong>
        <p>Standard deviation is the measure of dispersion of a set of data from its mean. It measures the absolute variability of a distribution; the higher the dispersion or variability, the greater is the standard deviation and greater will be the magnitude of the deviation of the value from their mean.</p>
    </Row>
    </form>
</div>