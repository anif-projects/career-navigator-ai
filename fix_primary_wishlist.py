import json
import re

# Read the file
with open('d:/PROJECT_WORKSPACE/GITHUB_WORKSPACE/anif/career-navigator-ai/frontend/src/pages/PrimaryEducation.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add wishlist state after schoolBoard state
content = content.replace(
    "const [schoolBoard, setSchoolBoard] = useState('CBSE'); // 'CBSE' or 'State'",
    """const [schoolBoard, setSchoolBoard] = useState('CBSE');
    const [wishlist, setWishlist] = useState([]);

    React.useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('collegeWishlist') || '[]');
        setWishlist(savedWishlist);
    }, []);

    const getSchoolId = (school) => {
        return school['ID'] || school['\ufeffID'] || school['School Name'];
    };

    const isInWishlist = (schoolId) => {
        return wishlist.some(item => item.id === schoolId);
    };

    const toggleWishlist = (school, event) => {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        const schoolId = getSchoolId(school);
        const schoolName = school['School Name'];
        let updatedWishlist;

        if (isInWishlist(schoolId)) {
            updatedWishlist = wishlist.filter(item => item.id !== schoolId);
        } else {
            const wishlistItem = {
                id: schoolId,
                name: schoolName,
                location: school['Location'] || school['City'] || 'N/A',
                type: school['Type'] || 'Primary',
                category: 'Primary Education',
                addedDate: new Date().toISOString()
            };
            updatedWishlist = [...wishlist, wishlistItem];
        }

        setWishlist(updatedWishlist);
        localStorage.setItem('collegeWishlist', JSON.stringify(updatedWishlist));
        window.dispatchEvent(new Event('wishlistUpdated'));
    };"""
)

# Add wishlist column header
content = content.replace(
    """                            <thead className="bg-gray-50">
                                <tr>
                                    {schools.length > 0 && Object.keys(schools[0]).map((key) => (""",
    """                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap sticky left-0 bg-gray-50 z-10">
                                        ❤️
                                    </th>
                                    {schools.length > 0 && Object.keys(schools[0]).map((key) => ("""
)

# Add wishlist button cell
content = content.replace(
    """                                    filteredSchools.map((school, index) => (
                                        <tr key={index} className="hover:bg-blue-50/50 transition-colors duration-150 group">
                                            {Object.values(school).map((val, idx) => (""",
    """                                    filteredSchools.map((school, index) => (
                                        <tr key={index} className="hover:bg-blue-50/50 transition-colors duration-150 group">
                                            <td className="px-6 py-4 whitespace-nowrap text-center sticky left-0 bg-white z-10">
                                                <button
                                                    onClick={(e) => toggleWishlist(school, e)}
                                                    className={`p-2 rounded-lg transition-all ${
                                                        isInWishlist(getSchoolId(school))
                                                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                                            : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600'
                                                    }`}
                                                    title={isInWishlist(getSchoolId(school)) ? 'Remove from wishlist' : 'Add to wishlist'}
                                                >
                                                    <svg className="w-5 h-5" fill={isInWishlist(getSchoolId(school)) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                </button>
                                            </td>
                                            {Object.values(school).map((val, idx) => ("""
)

# Write the file back
with open('d:/PROJECT_WORKSPACE/GITHUB_WORKSPACE/anif/career-navigator-ai/frontend/src/pages/PrimaryEducation.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Primary Education wishlist functionality added successfully!")
