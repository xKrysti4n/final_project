from app.core.get_es_client import get_client

# Napisz testy
import pytest
from app.core.get_es_client import get_client
@pytest.fixture
def es_client():
    return get_client()
    
def test_get_es_client():
    client_info = get_client().info()
    assert client_info['tagline'] == 'You Know, for Search'
