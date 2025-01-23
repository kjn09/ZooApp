import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './profilePage.module.css';
import Header from "./components/header";
import Navbar from "./components/navBar";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      router.push('/components/loginPage');
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/friendRequests");
        const data = await response.json();
        setFriendRequests(data);
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/components/loginPage');
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

 const acceptRequest = async (requestId, userId, friendId) => {
   try {
     const response = await fetch(`http://localhost:5000/friendRequests/${requestId}`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ status: "accepted" }),
     });

     if (response.ok) {
       const reverseRequestResponse = await fetch("http://localhost:5000/friendRequests");
       const allRequests = await reverseRequestResponse.json();

       const reverseRequest = allRequests.find(
         (request) =>
           request.userId === friendId &&
           request.friendId === userId &&
           request.status === "pending"
       );

       if (reverseRequest) {
         const reverseRequestUpdateResponse = await fetch(`http://localhost:5000/friendRequests/${reverseRequest.id}`, {
           method: "PATCH",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({ status: "accepted" }),
         });

         if (!reverseRequestUpdateResponse.ok) {
           console.error("Fehler beim Aktualisieren der umgekehrten Anfrage:", await reverseRequestUpdateResponse.text());
         }
       }

       setFriendRequests((prev) =>
         prev
           .map((request) => {
             if (request.id === requestId) return { ...request, status: "accepted" };
             if (reverseRequest && request.id === reverseRequest.id) return { ...request, status: "accepted" };
             return request;
           })
           .filter((request) => request.status === "pending" || request.status === "accepted")
       );
     } else {
       console.error("Fehler beim Aktualisieren der Anfrage:", await response.text());
     }
   } catch (error) {
     console.error("Fehler beim Annehmen der Anfrage:", error);
   }
 };








  const rejectRequest = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:5000/friendRequests/${requestId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Anfrage aus der Liste entfernen
        setFriendRequests((prev) => prev.filter((request) => request.id !== requestId));
      } else {
        console.error("Fehler: Anfrage konnte nicht entfernt werden.");
      }
    } catch (error) {
      console.error("Fehler beim Ablehnen der Anfrage:", error);
    }
  };


  // Filtere die Anfragen für den aktuellen Benutzer
  const pendingRequests = friendRequests.filter(
    (request) => request.friendId === user?.id && request.status === "pending"
  );

  return (
    <div>
      <Header onMenuClick={toggleNavbar} title={"Welcome to your Profile"} />
      {isNavbarOpen && <Navbar onClose={closeNavbar} />}
      <div className={styles.container}>
        {user ? (
          <div>
            <p className={styles.info}>
              Username: <strong>{user.username}</strong>
            </p>
            <button className={styles.button} onClick={handleLogout}>
              Logout
            </button>
            <div className={styles.requests}>
              <h3>Pending Friend Requests</h3>
              {pendingRequests.length > 0 ? (
                <ul>
                  {pendingRequests.map((request) => (
                    <li key={request.id}>
                      Friend request from user ID: {request.userId}
                      <button
                        className={styles.acceptButton}
                        onClick={() => acceptRequest(request.id, user.id, request.userId)}
                      >
                        Accept
                      </button>
                      <button
                        className={styles.rejectButton}
                        onClick={() => rejectRequest(request.id)}
                      >
                        Reject
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No pending requests</p>
              )}
            </div>

          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
