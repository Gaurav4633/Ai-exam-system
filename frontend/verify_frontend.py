from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # 1. Go to Home Page
        print("Navigating to Home...")
        page.goto("http://localhost:5173")
        page.screenshot(path="verification/1_home.png")
        
        # 2. Start Quiz
        print("Starting Quiz...")
        page.get_by_role("button", name="Start Quiz").click()
        page.wait_for_timeout(2000) # Wait for questions to load
        page.screenshot(path="verification/2_quiz.png")
        
        # 3. Select Options (Mocking through 5 questions)
        # Assuming 5 questions from default mock
        for i in range(5):
            print(f"Answering Question {i+1}...")
            # Select first option
            # The structure is list-group-item buttons
            options = page.locator(".list-group-item")
            if options.count() > 0:
                options.first.click()
                
                # Click Next or Finish
                next_btn = page.locator(".btn-primary", has_text="Next")
                finish_btn = page.locator(".btn-primary", has_text="Finish")
                
                if next_btn.is_visible():
                    next_btn.click()
                elif finish_btn.is_visible():
                    finish_btn.click()
                
                page.wait_for_timeout(500) # Wait for transition

        # 4. View Result
        print("Viewing Results...")
        page.wait_for_selector("text=Quiz Completed!")
        page.screenshot(path="verification/3_result.png")
        
        # 5. Go to Dashboard
        print("Going to Dashboard...")
        page.get_by_role("link", name="Go to Dashboard").click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/4_dashboard.png")
        
        browser.close()

if __name__ == "__main__":
    verify_app()
