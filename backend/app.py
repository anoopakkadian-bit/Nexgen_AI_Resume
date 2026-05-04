from backend.database import add_user, get_user
from backend.auth import hash_password, verify_password
from backend.processor import extract_text_from_pdf, analyze_resume

st.set_page_config(page_title="NexGen AI", layout="wide") 

if 'logged_in' not in st.session_state:
    st.session_state['logged_in'] = False

# --- ലോഗിൻ ചെയ്തിട്ടില്ലെങ്കിൽ ---
if not st.session_state['logged_in']:
    st.title("🚀 NexGen Resume AI")
    choice = st.sidebar.selectbox("Menu", ["Home", "Login", "SignUp"])

    if choice == "Home":
        st.subheader("Welcome! Please Login to continue.")

    elif choice == "SignUp":
        st.subheader("Create Account")
        new_user = st.text_input("Username")
        new_email = st.text_input("Email")
        new_pw = st.text_input("Password", type='password')
        if st.button("Signup"):
            if add_user(new_user, new_email, hash_password(new_pw)):
                st.success("Account created! Go to Login.")
            else:
                st.error("Error creating account.")

    elif choice == "Login":
        st.subheader("Login")
        user = st.text_input("Username")
        pw = st.text_input("Password", type='password')
        if st.button("Login"):
            user_data = get_user(user)
            
            if user_data:
                # പാസ്‌വേഡ് എവിടെയാണെന്ന് കണ്ടുപിടിക്കാൻ ഈ ലൂപ്പ് സഹായിക്കും
                match_found = False
                for item in user_data:
                    if verify_password(pw, str(item)):
                        match_found = True
                        break
                
                if match_found:
                    st.session_state['logged_in'] = True
                    st.session_state['username'] = user
                    st.rerun()
                else:
                    st.error("Password തെറ്റാണ്!")
                    st.info(f"Database-ൽ കണ്ട ഡാറ്റ: {user_data}") # ഇത് എറർ കണ്ടുപിടിക്കാൻ സഹായിക്കും
            else:
                st.error("ഈ Username നിലവിലില്ല!")

# --- ലോഗിൻ ചെയ്ത ശേഷം ---
else:
    st.sidebar.write(f"Logged in as: {st.session_state['username']}")
    if st.sidebar.button("Logout"):
        st.session_state['logged_in'] = False
        st.rerun()

    st.header("📊 Resume Analyzer Dashboard")
    uploaded_file = st.file_uploader("Upload your PDF Resume", type="pdf")

    if uploaded_file:
        with st.spinner("AI analyzing..."):
            text = extract_text_from_pdf(uploaded_file)
            result = analyze_resume(text)
            st.markdown("### Analysis Result:")
            st.write(result)