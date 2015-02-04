package eu.trentorise.smartcampus.citizenportal.service;

import java.io.FileOutputStream;
import java.util.Date;

import com.itextpdf.text.Anchor;
import com.itextpdf.text.BadElementException;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chapter;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.List;
import com.itextpdf.text.ListItem;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Section;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import eu.trentorise.smartcampus.citizenportal.repository.FinancialEd;
import eu.trentorise.smartcampus.citizenportal.repository.UserClassificationFinal;
import eu.trentorise.smartcampus.citizenportal.repository.UserClassificationProv;

public class PdfCreator {
	
	 private static String FILE = "ProvvClassification.pdf";
	 private static String FILE2 = "FinalClassification.pdf";
	  private static Font catFont = new Font(Font.FontFamily.HELVETICA, 18,
	      Font.BOLD);
	  private static Font redFont = new Font(Font.FontFamily.TIMES_ROMAN, 12,
	      Font.NORMAL, BaseColor.RED);
	  private static Font subFont = new Font(Font.FontFamily.HELVETICA, 14,
	      Font.BOLD);
	  private static Font smallBold = new Font(Font.FontFamily.HELVETICA, 12,
	      Font.BOLD);
	  
	  private static java.util.List<UserClassificationProv> listClass = null;
	  private static java.util.List<UserClassificationFinal> listClassFinal = null;
	  private static FinancialEd edFin = null;
	  private static String phase = null;

	public PdfCreator(String path, java.util.List<UserClassificationProv> data, java.util.List<UserClassificationFinal> data2, FinancialEd edFin, String phase) {
		// TODO Auto-generated constructor stub
		try {
		    Document document = new Document();
		    //System.out.println("PathFile :" + path);
		    if(data != null){
		    	this.listClass = data;
		    } else {
		    	this.listClassFinal = data2;
		    }
		    //System.out.println("ListClass :" + this.listClass);
		    this.edFin = edFin;
		    this.phase = phase;
		    if(phase.compareTo("Provvisoria") == 0){
		    	PdfWriter.getInstance(document, new FileOutputStream(path + FILE));
		    } else {
		    	PdfWriter.getInstance(document, new FileOutputStream(path + FILE2));
		    }
		    document.open();
		    addMetaData(document);
		    //addTitlePage(document);
		    addContent(document);
		    document.close();
		} catch (Exception e) {
		    e.printStackTrace();
		}
		
		
	}
	
	// iText allows to add metadata to the PDF which can be viewed in your Adobe
	// Reader
	// under File -> Properties
	private static void addMetaData(Document document) {
		document.addTitle("Graduatoria Provvisoria");
		document.addSubject("Using iText");
		document.addKeywords("Graduatoria, Provvisoria, Edilizia Pubblica");
		document.addAuthor("Comunita Della Vallagarina");
		document.addCreator("Comunita Della Vallagarina");
	}

	private static void addTitlePage(Document document)
			throws DocumentException {
		Paragraph preface = new Paragraph();
		// We add one empty line
		addEmptyLine(preface, 1);
		// Lets write a big header
		preface.add(new Paragraph("Title of the document", catFont));

		addEmptyLine(preface, 1);
		// Will create: Report generated by: _name, _date
		preface.add(new Paragraph(
				"Report generated by: " + System.getProperty("user.name") + ", " + new Date(), //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
				smallBold));
		addEmptyLine(preface, 3);
		preface.add(new Paragraph(
				"This document describes something which is very important ",
				smallBold));

		addEmptyLine(preface, 8);

		preface.add(new Paragraph(
				"This document is a preliminary version and not subject to your license agreement or any other agreement with vogella.com ;-).",
				redFont));

		document.add(preface);
		// Start a new page
		document.newPage();
	}

	private static void addContent(Document document) throws DocumentException {
		Anchor anchor = new Anchor("COMUNITA' DELLA VALLAGARINA", catFont);
		anchor.setName("COMUNITA' DELLA VALLAGARINA");
		
		// Second parameter is the number of the chapter
		Chapter catPart = new Chapter(new Paragraph(anchor), 1);
		catPart.setNumberDepth(0);

		Paragraph subPara = new Paragraph("Graduatoria Generale", subFont);
		Section subCatPart = catPart.addSection(subPara);
		subCatPart.setNumberDepth(0);
		Anchor phaseClass = new Anchor("Fase: " + phase, smallBold);
		Anchor state = new Anchor("Stato: Confermata", smallBold);
		Anchor edFinPer = new Anchor("Edizione: " + edFin.getPeriod(), smallBold);
		Anchor edFinCat = new Anchor("Categoria: " + edFin.getCategory(), smallBold);
		Anchor edFinTool = new Anchor("Strumento: " + edFin.getTool(), smallBold);
		
		//subCatPart.add(new Paragraph("Graduatoria: Generale"));
		subCatPart.add(new Paragraph(phaseClass));
		subCatPart.add(new Paragraph(state));
		subCatPart.add(new Paragraph(edFinPer));
		subCatPart.add(new Paragraph(edFinCat));
		subCatPart.add(new Paragraph(edFinTool));
		
		// add a list
		//createList(subCatPart);
		Paragraph paragraph = new Paragraph();
		addEmptyLine(paragraph, 1);
		subCatPart.add(paragraph);

		// add a table
		createTable(subCatPart);

		// now add all this to the document
		document.add(catPart);

		// Next section
		//anchor = new Anchor("Second Chapter", catFont);
		//anchor.setName("Second Chapter");

		// Second parameter is the number of the chapter
		//catPart = new Chapter(new Paragraph(anchor), 1);

		//subPara = new Paragraph("Subcategory", subFont);
		//subCatPart = catPart.addSection(subPara);
		//subCatPart.add(new Paragraph("This is a very important message"));

		// now add all this to the document
		//document.add(catPart);

	}

	private static void createTable(Section subCatPart)
			throws BadElementException {
		PdfPTable table = new PdfPTable(5);
		try {
			table.setTotalWidth(new float[]{ 70, 85, 250, 60, 60 });
			table.setLockedWidth(true);
		} catch (DocumentException e) {
			e.printStackTrace();
		}

		// t.setBorderColor(BaseColor.GRAY);
		// t.setPadding(4);
		// t.setSpacing(4);
		// t.setBorderWidth(1);

		PdfPCell c1 = new PdfPCell(new Phrase("Posizione", smallBold));
		c1.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(c1);

		c1 = new PdfPCell(new Phrase("Id Domanda", smallBold));
		c1.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(c1);

		c1 = new PdfPCell(new Phrase("Richiedente", smallBold));
		c1.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(c1);
		
		c1 = new PdfPCell(new Phrase("Comp.", smallBold));
		c1.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(c1);
		
		c1 = new PdfPCell(new Phrase("Punti", smallBold));
		c1.setHorizontalAlignment(Element.ALIGN_CENTER);
		table.addCell(c1);
		table.setHeaderRows(1);
		
		if(listClass != null){
			for(int i = 0; i < listClass.size(); i++){
				// Cell for position
				table.addCell(String.valueOf(listClass.get(i).getPosition()));
				// Cell for practice id
				PdfPCell cId = new PdfPCell(new Phrase(listClass.get(i).getPracticeId()));
				cId.setHorizontalAlignment(Element.ALIGN_CENTER);
				table.addCell(cId);
				// Cell for ric_name
				table.addCell(listClass.get(i).getRicName());
				// Cell for fam_components
				PdfPCell cComps = new PdfPCell(new Phrase(String.valueOf(listClass.get(i).getFamComponents())));
				cComps.setHorizontalAlignment(Element.ALIGN_RIGHT);
				table.addCell(cComps);
				// Cell for score
				PdfPCell cScore = new PdfPCell(new Phrase(listClass.get(i).getScore()));
				cScore.setHorizontalAlignment(Element.ALIGN_RIGHT);
				table.addCell(cScore);
			}
		} else {
			for(int i = 0; i < listClassFinal.size(); i++){
				// Cell for position
				table.addCell(String.valueOf(listClassFinal.get(i).getPosition()));
				// Cell for practice id
				PdfPCell cId = new PdfPCell(new Phrase(listClassFinal.get(i).getPracticeId()));
				cId.setHorizontalAlignment(Element.ALIGN_CENTER);
				table.addCell(cId);
				// Cell for ric_name
				table.addCell(listClassFinal.get(i).getRicName());
				// Cell for fam_components
				PdfPCell cComps = new PdfPCell(new Phrase(String.valueOf(listClassFinal.get(i).getFamComponents())));
				cComps.setHorizontalAlignment(Element.ALIGN_RIGHT);
				table.addCell(cComps);
				// Cell for score
				PdfPCell cScore = new PdfPCell(new Phrase(listClassFinal.get(i).getScore()));
				cScore.setHorizontalAlignment(Element.ALIGN_RIGHT);
				table.addCell(cScore);
			}
		}

		subCatPart.add(table);

	}

	private static void createList(Section subCatPart) {
		List list = new List(true, false, 10);
		list.add(new ListItem("First point"));
		list.add(new ListItem("Second point"));
		list.add(new ListItem("Third point"));
		subCatPart.add(list);
	}

	private static void addEmptyLine(Paragraph paragraph, int number) {
		for (int i = 0; i < number; i++) {
			paragraph.add(new Paragraph(" "));
		}
	}

}
