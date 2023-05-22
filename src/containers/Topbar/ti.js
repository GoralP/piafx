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
            <input className="ti_modal_fields" placeholder="14" type="number"  name="period_sma" onChange={handleChange} />
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