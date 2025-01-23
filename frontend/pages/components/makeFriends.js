const addFriend = async (userId, friendId) => {
  try {
    const response = await fetch('http://localhost:5000/send-friend-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, friendId }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Freundschaft erfolgreich hinzugefügt:', data.message);
      return { message: data.message };
    } else {
      console.log('Fehler:', data.message);
      return { message: 'Fehler: ' + data.message };
    }
  } catch (error) {
    console.log('Fehler beim Hinzufügen der Freundschaft:', error);
    return { message: 'Fehler beim Hinzufügen der Freundschaft.' };
  }
};

export default addFriend;
