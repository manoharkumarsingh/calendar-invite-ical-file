import React, { useState } from "react";

const CourseList = ({ courses }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [invitationDetails, setInvitationDetails] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleAddToCalendar = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
    // For simplicity, set default invitation details
    setInvitationDetails({
      title: `Class: ${course}`,
      date: "2024-01-15",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  const generateCalendarInvite = (course, details) => {
    // Implement the logic to generate the calendar invite data based on details.
    // For simplicity, let's use a basic example.
    const startDate = new Date(details.date);
    const startTimeParts = details.startTime.split(":");
    startDate.setHours(parseInt(startTimeParts[0], 10));
    startDate.setMinutes(parseInt(startTimeParts[1], 10));

    const endDate = new Date(details.date);
    const endTimeParts = details.endTime.split(":");
    endDate.setHours(parseInt(endTimeParts[0], 10));
    endDate.setMinutes(parseInt(endTimeParts[1], 10));
    details.description =
      "https://yourmembership.atlassian.net/browse/CWSV2-2566";

    const calendarData = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Example Calendar//EN
BEGIN:VEVENT
SUMMARY:${course} - ${details.title}
DESCRIPTION:${details.description}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
END:VEVENT
END:VCALENDAR
  `;

    return calendarData;
  };

  // ...

  const formatDate = (date) => {
    // Format date to iCal format (UTC time)
    return (
      date
        .toISOString()
        .replace(/-|:|\.\d+/g, "")
        .split(".")[0] + "Z"
    );
  };

  return (
    <div>
      <hr></hr>
      <h2 style={{ textAlign: "center" }}>Course List</h2>
      <div
        className="course-grid"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        {courses.map((course, index) => (
          <div key={index} className="course-item">
            <p>{course}</p>
            <button onClick={() => handleAddToCalendar(course)}>
              Add to Calendar
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h3>Invitation Details</h3>
            <p>Context Name: {selectedCourse}</p>
            <label>Title:</label>
            <input
              type="text"
              value={invitationDetails.title}
              onChange={(e) =>
                setInvitationDetails({
                  ...invitationDetails,
                  title: e.target.value,
                })
              }
            />
            <label>Date:</label>
            <input
              type="text"
              value={invitationDetails.date}
              onChange={(e) =>
                setInvitationDetails({
                  ...invitationDetails,
                  date: e.target.value,
                })
              }
            />
            <label>Start Time:</label>
            <input
              type="text"
              value={invitationDetails.startTime}
              onChange={(e) =>
                setInvitationDetails({
                  ...invitationDetails,
                  startTime: e.target.value,
                })
              }
            />
            <label>End Time:</label>
            <input
              type="text"
              value={invitationDetails.endTime}
              onChange={(e) =>
                setInvitationDetails({
                  ...invitationDetails,
                  endTime: e.target.value,
                })
              }
            />

            <button
              onClick={() => {
                const calendarData = generateCalendarInvite(
                  selectedCourse,
                  invitationDetails
                );

                const blob = new Blob([calendarData], {
                  type: "text/calendar;charset=utf-8",
                });
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute("download", `${selectedCourse}_invite.ics`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                handleCloseModal();
              }}
            >
              Add and Download Invite
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
