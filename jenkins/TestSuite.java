package assignment;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestSuite {

    @Test
    public void testHelloWorld() {
        assertEquals("hello world", Solution.getHelloWorld());
    }

    @Test
    public void testNumber10() {
        assertEquals(10, Solution.getNumber10());
    }

}
