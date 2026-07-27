import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def generate_pdf():
    pdf_path = os.path.join(os.path.dirname(__file__), "resume.pdf")
    
    # 24 pt margin (0.33 inch) for perfect single page layout
    margin = 24
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin
    )
    
    printable_width = letter[0] - 2 * margin # 564 pt
    
    styles = getSampleStyleSheet()
    
    # Base Typography Styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#0f172a')
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.3,
        leading=10.8,
        alignment=TA_RIGHT,
        textColor=colors.HexColor('#1e293b')
    )
    
    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=12,
        textColor=colors.HexColor('#0f172a'),
        spaceAfter=1,
        spaceBefore=4
    )

    summary_style = ParagraphStyle(
        'SummaryStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.2,
        textColor=colors.HexColor('#1e293b'),
        alignment=TA_JUSTIFY
    )
    
    item_title_style = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.2,
        leading=11.2,
        textColor=colors.HexColor('#0f172a')
    )
    
    item_subtitle_style = ParagraphStyle(
        'ItemSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.8,
        leading=10.8,
        textColor=colors.HexColor('#334155')
    )
    
    date_style = ParagraphStyle(
        'DateStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=10.8,
        alignment=TA_RIGHT,
        textColor=colors.HexColor('#334155')
    )
    
    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=10.6,
        textColor=colors.HexColor('#1e293b'),
        leftIndent=10,
        firstLineIndent=-6,
        spaceAfter=1.5,
        alignment=TA_LEFT
    )
    
    skill_category_style = ParagraphStyle(
        'SkillCategory',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=10.8,
        textColor=colors.HexColor('#0f172a')
    )
    
    skill_desc_style = ParagraphStyle(
        'SkillDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=10.8,
        textColor=colors.HexColor('#1e293b')
    )

    story = []
    
    # -------------------------------------------------------------------------
    # 1. HEADER SECTION
    # -------------------------------------------------------------------------
    header_left = Paragraph(
        "<b>Ayush Vashishth</b><br/>"
        "<font size='8' color='#334155'>linkedin.com/in/ayushvs1201<br/>"
        "github.com/Ayush-Vashishth</font>",
        name_style
    )
    header_right_text = (
        "+91-9045495707<br/>"
        "ayushvs1201@gmail.com<br/>"
        "ayushvs.me/Ayush-Vashishth/"
    )
    header_right = Paragraph(header_right_text, contact_style)
    
    header_table = Table(
        [[header_left, header_right]],
        colWidths=[printable_width * 0.55, printable_width * 0.45]
    )
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'BOTTOM'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 2))

    # Helper function for section headings with clean horizontal rule
    def add_section_header(title):
        story.append(Paragraph(title, section_heading_style))
        story.append(HRFlowable(
            width="100%",
            thickness=0.75,
            color=colors.HexColor('#0f172a'),
            spaceBefore=1,
            spaceAfter=3
        ))

    # -------------------------------------------------------------------------
    # 2. PROFESSIONAL SUMMARY
    # -------------------------------------------------------------------------
    add_section_header("Professional Summary")
    story.append(Paragraph(
        "Final-year B.Tech Computer Science student specializing in Cyber Security and Forensics with hands-on "
        "experience in HashiCorp Vault, Jenkins CI/CD, and secure application development. Passionate about "
        "security engineering, vulnerability assessment, and building secure, scalable systems.",
        summary_style
    ))
    story.append(Spacer(1, 1))

    # -------------------------------------------------------------------------
    # 3. TECHNICAL SKILLS
    # -------------------------------------------------------------------------
    add_section_header("Technical Skills")
    
    skills = [
        ("Programming & APIs:", "Java, HTML5, CSS3, FastAPI, REST APIs"),
        ("Cybersecurity:", "HashiCorp Vault, Secure CI/CD, Secrets Management, RBAC, Vulnerability Assessment"),
        ("Tools & Platforms:", "Git, GitHub, Jenkins, Linux"),
        ("Databases:", "MySQL, MongoDB")
    ]
    
    skills_table_data = []
    for cat, desc in skills:
        col1 = Paragraph(f"<b>{cat}</b>", skill_category_style)
        col2 = Paragraph(desc, skill_desc_style)
        skills_table_data.append([col1, col2])
        
    skills_table = Table(skills_table_data, colWidths=[printable_width * 0.28, printable_width * 0.72])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 1))

    # -------------------------------------------------------------------------
    # 4. EXPERIENCE
    # -------------------------------------------------------------------------
    add_section_header("Experience")
    
    # Anantixia
    exp1_header = Table([
        [
            Paragraph("<b>Anantixia Pvt. Ltd.</b>", item_title_style),
            Paragraph("Mar 2026 &ndash; Present", date_style)
        ]
    ], colWidths=[printable_width * 0.78, printable_width * 0.22])
    exp1_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(exp1_header)
    story.append(Paragraph("<i>Web Developer Intern &mdash; Security Engineering</i>", item_subtitle_style))
    story.append(Spacer(1, 1))
    
    exp1_bullets = [
        "Implemented HashiCorp Vault with Jenkins for centralized secrets management across CI/CD pipelines.",
        "Configured RBAC policies for secure credential access and secrets management across CI/CD pipelines.",
        "Developed responsive dashboards by integrating REST APIs and converting Figma designs."
    ]
    for b in exp1_bullets:
        story.append(Paragraph(f"&bull; {b}", bullet_style))

    story.append(Spacer(1, 1))

    # Nauka Foundation
    exp2_header = Table([
        [
            Paragraph("<b>Nauka Foundation</b>", item_title_style),
            Paragraph("Jun 2024 &ndash; Jul 2024", date_style)
        ]
    ], colWidths=[printable_width * 0.78, printable_width * 0.22])
    exp2_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(exp2_header)
    story.append(Paragraph("<i>Social Internship &mdash; Web Developer</i>", item_subtitle_style))
    story.append(Spacer(1, 1))
    
    exp2_bullets = [
        "Developed and maintained the organization's WordPress website and informational pages.",
        "Designed and deployed a responsive donation page to support online fundraising.",
        "Improved website navigation and user experience through content organization and page optimization."
    ]
    for b in exp2_bullets:
        story.append(Paragraph(f"&bull; {b}", bullet_style))

    story.append(Spacer(1, 1))

    # -------------------------------------------------------------------------
    # 5. PROJECTS
    # -------------------------------------------------------------------------
    add_section_header("Projects")
    
    # Project 1: ATLAS
    story.append(Paragraph("<b>ATLAS &ndash; Advanced Testing Lab for Application Security</b>", item_title_style))
    story.append(Spacer(1, 1))
    
    proj1_bullets = [
        "Developed a FastAPI-based cybersecurity platform for automated Web and IoT vulnerability assessment.",
        "Integrated REST APIs, Nmap, and OWASP Top 10 practices for automated security testing.",
        "Built interactive dashboards with automated HTML/JSON security reporting."
    ]
    for b in proj1_bullets:
        story.append(Paragraph(f"&bull; {b}", bullet_style))

    story.append(Spacer(1, 1))

    # Project 2: ATS Resume Builder
    story.append(Paragraph("<b>ATS Resume Builder</b>", item_title_style))
    story.append(Spacer(1, 1))
    
    proj2_bullets = [
        "Developed a full-stack ATS resume builder with job description analysis and resume optimization.",
        "Built REST APIs for resume generation, profile management, and PDF export.",
        "Designed responsive interfaces to simplify resume creation and customization."
    ]
    for b in proj2_bullets:
        story.append(Paragraph(f"&bull; {b}", bullet_style))

    story.append(Spacer(1, 1))

    # -------------------------------------------------------------------------
    # 6. EDUCATION
    # -------------------------------------------------------------------------
    add_section_header("Education")
    
    edu1_header = Table([
        [
            Paragraph("<b>UPES, Dehradun</b>", item_title_style),
            Paragraph("Aug 2023 &ndash; Present", date_style)
        ]
    ], colWidths=[printable_width * 0.76, printable_width * 0.24])
    edu1_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu1_header)
    
    edu1_sub = Table([
        [
            Paragraph("B.Tech in Computer Science Engineering (Cyber Security and Forensics)", item_desc_style if 'item_desc_style' in locals() else item_subtitle_style),
            Paragraph("<b>CGPA: 7.95/10</b>", date_style)
        ]
    ], colWidths=[printable_width * 0.76, printable_width * 0.24])
    edu1_sub.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu1_sub)

    edu2_header = Table([
        [
            Paragraph("<b>Dewan Public School, Meerut</b>", item_title_style),
            Paragraph("2022", date_style)
        ]
    ], colWidths=[printable_width * 0.76, printable_width * 0.24])
    edu2_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu2_header)
    story.append(Paragraph("CBSE", item_subtitle_style))
    story.append(Spacer(1, 1))

    # -------------------------------------------------------------------------
    # 7. CERTIFICATES
    # -------------------------------------------------------------------------
    add_section_header("Certificates")
    
    cert_bullets = [
        "<b>Understanding LLMs and Basic Prompting Techniques</b> &ndash; CodeSignal",
        "<b>Detecting and Responding to a Cyber Attack</b> &ndash; Texas A&amp;M Engineering Extension Service (TEEX)"
    ]
    for b in cert_bullets:
        story.append(Paragraph(f"&bull; {b}", bullet_style))

    story.append(Spacer(1, 1))

    # -------------------------------------------------------------------------
    # 8. ACHIEVEMENTS
    # -------------------------------------------------------------------------
    add_section_header("Achievements")
    
    ach_bullets = [
        "Published a research paper on <b>Post-Quantum Cryptography</b>, proposing a risk-based framework for securing hybrid enterprise networks.",
        "Organized a technical hackathon under the <b>HyperVision Student Chapter</b>, leading event planning and technical coordination."
    ]
    for b in ach_bullets:
        story.append(Paragraph(f"&bull; {b}", bullet_style))

    # Build PDF
    doc.build(story)
    print("PDF generation complete: resume.pdf matching user resume 1:1 successfully generated!")

if __name__ == "__main__":
    generate_pdf()
