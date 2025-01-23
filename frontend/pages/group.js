import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from './components/header';
import Navbar from './components/navbar';
import styles from './group.module.css';

export default function Group() {
  const [users, setUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [groups, setGroups] = useState([]); // Neu: Gruppen des Benutzers
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [groupName, setGroupName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, requestsResponse, groupsResponse] = await Promise.all([
          fetch('http://localhost:5000/users'),
          fetch('http://localhost:5000/friendRequests'),
          fetch('http://localhost:5000/groups'),
        ]);

        const usersData = await usersResponse.json();
        const requestsData = await requestsResponse.json();
        const groupsData = await groupsResponse.json();

        setUsers(usersData);
        setFriendRequests(requestsData);

        if (user) {
          const userGroups = groupsData.filter((group) =>
            group.members.includes(user.id)
          );
          setGroups(userGroups);
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      router.push('/components/friends');
    }
  }, [router]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((u) =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
  const closeNavbar = () => setIsNavbarOpen(false);

  const toggleFriendSelection = (friend) => {
    setSelectedFriends((prevSelected) =>
      prevSelected.some((f) => f.id === friend.id)
        ? prevSelected.filter((f) => f.id !== friend.id)
        : [...prevSelected, friend]
    );
  };

  const saveGroup = async () => {
    if (!groupName.trim()) {
      setMessage('Bitte gib der Gruppe einen Namen.');
      return;
    }
    if (selectedFriends.length === 0) {
      setMessage('Bitte wähle mindestens einen Freund aus.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupName,
          members: [user.id, ...selectedFriends.map((friend) => friend.id)],
        }),
      });

      if (response.ok) {
        setMessage('Gruppe erfolgreich erstellt!');
        setGroupName('');
        setSelectedFriends([]);
      } else {
        const data = await response.json();
        setMessage('Fehler: ' + data.message);
      }
    } catch (error) {
      setMessage('Fehler beim Erstellen der Gruppe.');
    }
  };

  return (
    <div>
      <Header onMenuClick={toggleNavbar} title="Gruppe" />
      {isNavbarOpen && <Navbar onClose={closeNavbar} />}
      <div className={styles.container}>


      <input
        className={styles.searchBar}
        type="text"
        placeholder="Benutzer suchen"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <h3 className={styles.sectionTitle}>Deine Gruppen</h3>
      <ul className={styles.list}>
        {groups.map((group) => (
          <li key={group.id} className={styles.listItem}>
            <strong>{group.groupName}</strong> <br />
            Mitglieder: {group.members.length}
          </li>
        ))}
      </ul>

      <h3 className={styles.sectionTitle}>Freunde</h3>
      <ul className={styles.list}>
        {users
          .filter((u) =>
            friendRequests.some(
              (req) =>
                req.status === 'accepted' &&
                ((req.userId === user?.id && req.friendId === u.id) ||
                  (req.friendId === user?.id && req.userId === u.id))
            )
          )
          .map((friend) => (
            <li key={friend.id} className={styles.listItem}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedFriends.some((f) => f.id === friend.id)}
                  onChange={() => toggleFriendSelection(friend)}
                />
                {friend.username}
              </label>
            </li>
          ))}
      </ul>

      <h3 className={styles.sectionTitle}>Gruppe erstellen</h3>
      <input
        className={styles.input}
        type="text"
        placeholder="Gruppenname"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button className={styles.button} onClick={saveGroup}>
        Gruppe erstellen
      </button>

      <p className={styles.message}>{message}</p>
    </div>
    </div>
  );
}
