import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import LeftMenu from "./left_menu";
import Pagination from "./pagination";

const ProductionOutdoorLine2 = () => {
  const [list, setList] = useState([]);
  const [serialNo, setSerialNo] = useState("");
  const [partNo, setPartNo] = useState("");
  const [staff, setStaff] = useState("");
  const [result, setResult] = useState("");
  const [station, setStation] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [PerPage] = useState(30);

  const { outdoor_line } = require("../controller/functions");

  useEffect(() => {
    let mounted = true;

    const list_data = () => {
      outdoor_line()
        .then((res) => {
          const data_list = res.filter((item) => item.unitLine === "2");

          setList(data_list);
        })
        .catch(() => {
          setList([]);
        });
    };

    if (mounted) {
      list_data();
    }

    setInterval(() => {
      if (mounted) {
        list_data();
      }
    }, 5000);

    return function cleanup() {
      mounted = false;
    };
  }, [outdoor_line]);

  const input_change = (e) => {
    if (e.target.name === "sn") {
      setSerialNo(e.target.value);
    } else if (e.target.name === "part_no") {
      setPartNo(e.target.value);
    } else if (e.target.name === "staff") {
      setStaff(e.target.value);
    } else if (e.target.name === "result") {
      setResult(e.target.value);
    } else if (e.target.name === "station") {
      setStation(e.target.value);
    } else if (e.target.name === "end_date") {
      setEndDate(e.target.value);
    } else {
      setEndTime(e.target.value);
    }
  };

  const reset = (e) => {
    e.preventDefault();

    setSerialNo("");
    setPartNo("");
    setStaff("");
    setResult("");
    setStation("");
    setEndDate("");
    setEndTime("");
  };

  const date_format = (date) => {
    const time = new Date(date);
    const offsetMs = time.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(time.getTime() - offsetMs);
    const str = dateLocal
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "/")
      .replace("T", " ");

    const date_format = str.split("/");

    return date_format[2] + "/" + date_format[1] + "/" + date_format[0];
  };

  const time_format = (date) => {
    const time = new Date(date);
    const offsetMs = time.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(time.getTime() - offsetMs);
    const str = dateLocal
      .toISOString()
      .slice(10, 19)
      .replace(/-/g, "/")
      .replace("T", " ");

    return str;
  };

  const indexOfLastPost = currentPage * PerPage;
  const indexOfFirstPost = indexOfLastPost - PerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="summary-container h-100">
      <div className="row mx-2">
        <div className="col-12 ">
          <h1>SMART PRODUCTION</h1>
        </div>
      </div>
      <LeftMenu />
      <div id="content">
        <h2 className="text-center mt-4 mb-0">
          <b>PRODUCTION STATUS</b> OUTDOOR UNIT LINE 2
        </h2>
        <hr className="hr-header" />
        <div className="d-flex-left px-4">
          <div className="summary-select">
            <label className="mb-1">ITEM</label>
            <select
              className="pl-2"
              name="sn"
              value={serialNo}
              onChange={input_change}
            >
              <option>Select Serial No.</option>
            </select>
          </div>
          <div className="summary-input pl-4">
            <label className="mb-1">&nbsp;</label>
            <input
              type="text"
              name="part_no"
              placeholder="Part No."
              className="px-2"
              value={partNo}
              onChange={input_change}
              autoComplete="off"
            />
          </div>
          <div className="summary-input pl-4">
            <label className="mb-1">&nbsp;</label>
            <input
              type="text"
              name="staff"
              placeholder="Staff"
              className="px-2"
              value={staff}
              onChange={input_change}
              autoComplete="off"
            />
          </div>
          <div className="summary-select pl-4">
            <label className="mb-1">&nbsp;</label>
            <select
              className="pl-2"
              name="result"
              value={result}
              onChange={input_change}
            >
              <option>Select Result</option>
              <option value="pass">Pass</option>
              <option value="fail">Fail</option>
            </select>
          </div>
        </div>
        <div className="d-flex-left mt-4 px-4">
          <div className="summary-select">
            <label className="mb-1">STATION</label>
            <select
              className="pl-2"
              name="Item"
              value={station}
              onChange={input_change}
            >
              <option>Select Status</option>
            </select>
          </div>
          <div className="summary-input pl-4">
            <label className="mb-1">&nbsp;</label>
            <DatePicker
              placeholderText="End Date"
              selected={endDate}
              onChange={(endDate) => setEndDate(endDate)}
              className="px-2"
              dateFormat="dd/MM/yyyy"
              isClearable
            />
          </div>
          <div className="summary-input pl-4">
            <label className="mb-1">&nbsp;</label>
            <DatePicker
              placeholderText="End Time"
              selected={endTime}
              onChange={(endTime) => setEndTime(endTime)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={1}
              timeCaption="Time"
              timeFormat="HH:mm"
              dateFormat="HH:mm"
              isClearable
              className="px-2"
            />
          </div>
        </div>
        <div className="d-flex mt-5 px-4">
          <button type="button" className="search-btn px-2 mx-2">
            Search
          </button>
          <button type="button" className="reset-btn px-2 mx-2" onClick={reset}>
            Reset
          </button>
        </div>
        <div className="px-4 mt-4 pt-1">
          <hr className="summary-hr" />
        </div>
        <div className="summary-table-container px-4">
          <div className="table-responsive mb-4">
            <table className="table text-center">
              <thead>
                <tr>
                  <th rowSpan="2" className="align-middle">
                    Serial No.
                  </th>
                  <th colSpan="4" className="align-middle">
                    สถานีที่ 1 ประกอบคอมเพรสเซอร์
                  </th>
                  <th colSpan="4" className="align-middle">
                    สถานีที่ 2 ประกอบชุดคอยล์
                  </th>
                  <th colSpan="4" className="align-middle">
                    สถานีที่ 3 ประกอบชุดมอเตอร์
                  </th>
                  <th colSpan="4" className="align-middle">
                    สถานีที่ 4 HIGH PRESSURE NITROGEN
                  </th>
                  <th colSpan="4" className="align-middle">
                    สถานีที่ 5 ประกอบกล่องคอนโทรลที่มีการเชื่อมต่อ
                  </th>
                  <th colSpan="4" className="align-middle">
                    สถานีที่ 6 ประกอบใบพัด
                  </th>
                  <th colSpan="4" className="align-middle">
                    สถานีที่ 7 ชาร์จน้ำยา
                  </th>
                  <th colSpan="4" className="align-middle">
                    สถานีที่ 8 ตรวจสอบการรั่ว
                  </th>
                  <th colSpan="4" className="align-middle">
                    สถานีที่ 9 ประกอบโครง
                  </th>
                  <th colSpan="4" className="align-middle">
                    สถานีที่ 10 ตรวจสอบการเชื่อมต่ออินเตอร์เน็ต
                  </th>
                  <th colSpan="4" className="align-middle">
                    สถานีที่ 11 Packing
                  </th>
                </tr>
                <tr>
                  <th className="align-middle">Part No.</th>
                  <th className="align-middle">Staff</th>
                  <th className="align-middle">End Date</th>
                  <th className="align-middle">End Time</th>
                  <th className="align-middle">Part No.</th>
                  <th className="align-middle">Staff</th>
                  <th className="align-middle">End Date</th>
                  <th className="align-middle">End Time</th>
                  <th className="align-middle">Part No.</th>
                  <th className="align-middle">Staff</th>
                  <th className="align-middle">End Date</th>
                  <th className="align-middle">End Time</th>
                  <th className="align-middle">Staff</th>
                  <th className="align-middle">End Date</th>
                  <th className="align-middle">End Time</th>
                  <th className="align-middle">Result</th>
                  <th className="align-middle">Part No.</th>
                  <th className="align-middle">Staff</th>
                  <th className="align-middle">End Date</th>
                  <th className="align-middle">End Time</th>
                  <th className="align-middle">Part No.</th>
                  <th className="align-middle">Staff</th>
                  <th className="align-middle">End Date</th>
                  <th className="align-middle">End Time</th>
                  <th className="align-middle">Staff</th>
                  <th className="align-middle">End Date</th>
                  <th className="align-middle">End Time</th>
                  <th className="align-middle">Result</th>
                  <th className="align-middle">Staff</th>
                  <th className="align-middle">End Date</th>
                  <th className="align-middle">End Time</th>
                  <th className="align-middle">Result</th>
                  <th className="align-middle">Staff</th>
                  <th className="align-middle">End Date</th>
                  <th className="align-middle">End Time</th>
                  <th className="align-middle">Result</th>
                  <th className="align-middle">Staff</th>
                  <th className="align-middle">End Date</th>
                  <th className="align-middle">End Time</th>
                  <th className="align-middle">Result</th>
                  <th className="align-middle">Staff</th>
                  <th className="align-middle">End Date</th>
                  <th className="align-middle">End Time</th>
                  <th className="align-middle">Result</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.length > 0 ? (
                  currentPosts.map((item, index) => (
                    <tr key={index} id={index}>
                      <td className="align-middle">{item.serialNo}</td>
                      <td className="align-middle">
                        {typeof item.compressor.partNo !== "undefined"
                          ? item.compressor.partNo
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.compressor.staff !== "undefined"
                          ? item.compressor.staff
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.compressor.endTime !== "undefined"
                          ? date_format(item.compressor.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.compressor.endTime !== "undefined"
                          ? time_format(item.compressor.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.coil.partNo !== "undefined"
                          ? item.coil.partNo
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.coil.staff !== "undefined"
                          ? item.coil.staff
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.coil.endTime !== "undefined"
                          ? date_format(item.coil.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.coil.endTime !== "undefined"
                          ? time_format(item.coil.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.motor.partNo !== "undefined"
                          ? item.motor.partNo
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.motor.staff !== "undefined"
                          ? item.motor.staff
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.motor.endTime !== "undefined"
                          ? date_format(item.motor.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.motor.endTime !== "undefined"
                          ? time_format(item.motor.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.presureNitogen.staff !== "undefined"
                          ? item.presureNitogen.staff
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.presureNitogen.endTime !== "undefined"
                          ? date_format(item.presureNitogen.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.presureNitogen.endTime !== "undefined"
                          ? time_format(item.presureNitogen.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.presureNitogen.result !== "undefined"
                          ? item.presureNitogen.result
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.boardControl.partNo !== "undefined"
                          ? item.boardControl.partNo
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.boardControl.staff !== "undefined"
                          ? item.boardControl.staff
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.boardControl.endTime !== "undefined"
                          ? date_format(item.boardControl.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.boardControl.endTime !== "undefined"
                          ? time_format(item.boardControl.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.fan.partNo !== "undefined"
                          ? item.fan.partNo
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.fan.staff !== "undefined"
                          ? item.fan.staff
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.fan.endTime !== "undefined"
                          ? date_format(item.fan.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.fan.endTime !== "undefined"
                          ? time_format(item.fan.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.rechargeReagent.staff !== "undefined"
                          ? item.rechargeReagent.staff
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.rechargeReagent.endTime !== "undefined"
                          ? date_format(item.rechargeReagent.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.rechargeReagent.endTime !== "undefined"
                          ? time_format(item.rechargeReagent.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.rechargeReagent.result !== "undefined"
                          ? item.rechargeReagent.result
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.checkLeak.staff !== "undefined"
                          ? item.checkLeak.staff
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.checkLeak.endTime !== "undefined"
                          ? date_format(item.checkLeak.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.checkLeak.endTime !== "undefined"
                          ? time_format(item.checkLeak.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.checkLeak.result !== "undefined"
                          ? item.checkLeak.result
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.assembleFrame.staff !== "undefined"
                          ? item.assembleFrame.staff
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.assembleFrame.endTime !== "undefined"
                          ? date_format(item.assembleFrame.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.assembleFrame.endTime !== "undefined"
                          ? time_format(item.assembleFrame.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.assembleFrame.result !== "undefined"
                          ? item.assembleFrame.result
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.internetTest.staff !== "undefined"
                          ? item.internetTest.staff
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.internetTest.endTime !== "undefined"
                          ? date_format(item.internetTest.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.internetTest.endTime !== "undefined"
                          ? time_format(item.internetTest.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.internetTest.result !== "undefined"
                          ? item.internetTest.result
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.packing.staff !== "undefined"
                          ? item.packing.staff
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.packing.endTime !== "undefined"
                          ? date_format(item.packing.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.packing.endTime !== "undefined"
                          ? time_format(item.packing.endTime)
                          : ""}
                      </td>
                      <td className="align-middle">
                        {typeof item.packing.result !== "undefined"
                          ? item.checkLeak.result
                          : ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="45">No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            postsPerPage={PerPage}
            totalPosts={list.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductionOutdoorLine2;
